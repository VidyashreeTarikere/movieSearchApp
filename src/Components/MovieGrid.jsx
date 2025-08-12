import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { supabase } from "../Utils/SupabaseClient";
import React, { useEffect, useState } from "react";
import AddFavorite from "./AddFavorite";
import { useNavigate } from "react-router-dom";

const MovieGrid = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [heart, setHeartRed] = useState({
    state: false,
    number: "0",
  });

  const navigate = useNavigate();

  const handleFavorite = () => {
    const newHeartState = !heart.state;
    setHeartRed({
      state: newHeartState,
      number: newHeartState ? "1" : "0",
    });

    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user.id, movie.id, newHeartState);
      await AddFavorite(user.id, movie.id, movie.media_type, newHeartState);
    };
    fetchUser();
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("movie_id", movie.id)
        .single();

      if (data) {
        setHeartRed({ state: true, number: "1" });
      }

      setIsLoading(false);
    };
    fetchFavorites();
  }, [movie.id]);

  const handleMovieDetails = () => {
    navigate(`/details/${movie.media_type}/${movie.id}`);
  };

  const SkeletonCard = () => (
    <div className="relative flex flex-col my-6  shadow-sm border border-gray-700 rounded-lg w-96 animate-pulse">
      <div className="relative h-56 m-2.5 overflow-hidden bg-gray-500 rounded-md"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-500 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-500 rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-500 rounded w-5/6 mb-1"></div>
        <div className="h-4 bg-gray-500 rounded w-2/3"></div>
      </div>
      <div className="px-4 pb-4 pt-0 mt-2">
        <div className="h-8 w-24 bg-gray-500 rounded"></div>
      </div>
    </div>
  );

  return (
    <>
      {isLoading ? (
        <SkeletonCard />
      ) : (
        <div className="relative flex flex-col my-6  shadow-sm border border-slate-200 rounded-lg w-96">
          <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
            {movie.backdrop_path ? (
              <img
                key={movie.id}
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt="Movie poster"
              />
            ) : (
              <div>Image not found</div>
            )}
          </div>
          <div className="p-4">
            <h6 className="mb-2 text-white text-xl font-semibold overflow-y-scroll h-10">
              {movie.title || movie.name}
            </h6>
            <p className="text-white leading-normal font-light overflow-y-scroll h-20">
              {movie.overview}
            </p>
          </div>
          <div className="px-4 pb-4 pt-0 mt-2">
            <button
              className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handleFavorite}
            >
              <span className="flex items-center gap-2">
                {heart.state ? (
                  <HeartIconSolid className="h-5 w-5 text-red-500 rounded-lg hover:scale-105 focus:scale-95 transition-transform duration-200" />
                ) : (
                  <HeartIconOutline className="h-5 w-5 text-gray-300 rounded-lg hover:scale-105 focus:scale-95 transition-transform duration-200" />
                )}
                {heart.number}
              </span>
            </button>
          </div>

          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 mb-4 mr-10 ml-10 rounded"
            onClick={handleMovieDetails}
          >
            Details
          </button>
        </div>
      )}
    </>
  );
};

export default MovieGrid;
