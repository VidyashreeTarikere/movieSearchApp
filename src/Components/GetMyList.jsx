import React, { useEffect, useState } from "react";
import { supabase } from "../Utils/SupabaseClient";
import MyList from "../api/MyList";
import Recommendations from "./Recommendations";

const GetMyList = ({ explore }) => {
  const [movieIds, setMovieIds] = useState([]);

  useEffect(() => {
    const fetchMyMovies = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const fetchMovies = async () => {
        const { data: favorites } = await supabase
          .from("favorites")
          .select("movie_id, type")
          .eq("user_id", user.id);

        if (favorites) {
          setMovieIds(
            favorites.map((fav) => ({
              movie_id: fav.movie_id,
              type: fav.type,
            }))
          );
        }
      };

      await fetchMovies();

      const subscription = supabase
        .channel("favorites")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "favorites",
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            fetchMovies();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    };
    fetchMyMovies();
  }, []);

  return (
    <>
      <MyList movieIds={movieIds} explore={explore} />
      <Recommendations movieIds={movieIds} />
    </>
  );
};

export default GetMyList;
