// import React, { useState } from "react";

import { useEffect, useState } from "react";
import MovieGrid from "../Components/MovieGrid";

const PopularMovie = ({ explore }) => {
  const [famousMovie, setFamousMovie] = useState([]);
  const [famousTV, setFamousTV] = useState([]);

  const apiMovie = `https://api.themoviedb.org/3/movie/popular`;
  const apiTV = `https://api.themoviedb.org/3/tv/popular`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  useEffect(() => {
    if (!explore) {
      const handlePopularMovies = async () => {
        const response = await fetch(apiMovie, options);
        const data = await response.json();

        let famousMovieArray = [];

        if (Array.isArray(data.results)) {
          famousMovieArray = data.results;
        } else if (typeof data.results === "object") {
          famousMovieArray = Object.values(data.results);
        }
        // console.log(famousMovieArray);
        setFamousMovie(famousMovieArray);
      };

      const handlePopularTV = async () => {
        const response = await fetch(apiTV, options);
        const data = await response.json();

        let famousTVArray = [];

        if (Array.isArray(data.results)) {
          famousTVArray = data.results;
        } else if (typeof data.results === "object") {
          famousTVArray = Object.values(data.results);
        }
        console.log(famousTVArray);
        setFamousTV(famousTVArray);
      };
      handlePopularMovies();
      handlePopularTV();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [explore]);

  return (
    <>
      {!explore ? (
        <div className="flex-col w-full overflow-hidden inline-flex flex-nowrap">
          <h1>Popular Movies</h1>
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none  animate-infinite-scroll">
            {famousMovie.map((movie) => (
              <li key={movie.id}>
                <div className="hover:scale-110 transition-transform duration-300">
                  <MovieGrid movie={movie} />
                </div>
              </li>
            ))}
          </ul>

          <h1>Popular TV Shows</h1>
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-reverse-scroll">
            {famousTV.map((tv) => (
              <li key={tv.id}>
                <div className="hover:scale-110 transition-transform duration-300">
                  <MovieGrid movie={tv} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default PopularMovie;
