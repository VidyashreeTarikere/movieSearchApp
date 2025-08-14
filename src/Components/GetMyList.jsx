import React, { useEffect, useState } from "react";
import { supabase } from "../Utils/SupabaseClient";
import MyList from "../api/MyList";
import Recommendations from "./Recommendations";

const GetMyList = ({ explore }) => {
  const [movieIds, setMovieIds] = useState([]);

  useEffect(() => {
    let subscription;
    const fetchMyMovies = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          console.error("Auth error:", authError);
          return;
        }

        if (!user?.id) {
          console.log("No user found!");
          setMovieIds([]);
          return;
        }

        const fetchMovies = async () => {
          try {
            const { data: favorites, error } = await supabase
              .from("favorites")
              .select("movie_id, type", { head: false })
              .eq("user_id", user.id);

            if (error) {
              console.error("Error while fetching!", error);
              return;
            }

            if (favorites) {
              setMovieIds(
                favorites.map((fav) => ({
                  movie_id: fav.movie_id,
                  type: fav.type,
                })) || []
              );
            } else {
              setMovieIds([]);
            }
          } catch (err) {
            console.error("Error!!", err);
          }
        };

        await fetchMovies();

        subscription = supabase
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
      } catch (error) {
        console.error("Unexpected Error!", error);
        setMovieIds([]);
      }
    };
    fetchMyMovies();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <>
      <MyList movieIds={movieIds} explore={explore} />
      <Recommendations movieIds={movieIds} />
    </>
  );
};

export default GetMyList;
