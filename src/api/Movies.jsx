import React, { useEffect, useState } from "react";
import MovieGrid from "../Components/MovieGrid";

const MoviesPage = ({ explore }) => {
  //   console.log(explore);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  //   const [latestMovies, setLatestMovies] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };
  // trending movies
  const trendingApi = `https://api.themoviedb.org/3/trending/movie/day?`;

  //Upcoming movies
  const upcomingApi = `https://api.themoviedb.org/3/movie/upcoming`;

  //Latest movies
  //   const latestApi = `https://api.themoviedb.org/3/movie/latest`;

  useEffect(() => {
    if (!explore) {
      const handleTrendingMovies = async () => {
        const response = await fetch(trendingApi, options);
        const data = await response.json();

        let trendingMoviesArray = [];

        if (Array.isArray(data.results)) {
          trendingMoviesArray = data.results;
        } else if (typeof data.results === "object") {
          trendingMoviesArray = Object.values(data.results);
        }

        setTrendingMovies(trendingMoviesArray);
      };

      const handleUpcomingMovies = async () => {
        const response = await fetch(upcomingApi, options);
        const data = await response.json();

        let upcomingMoviesArray = [];

        if (Array.isArray(data.results)) {
          upcomingMoviesArray = data.results;
        } else if (typeof data.results === "object") {
          upcomingMoviesArray = Object.values(data.results);
        }

        setUpcomingMovies(upcomingMoviesArray);
      };

      //   const handleLatestMovies = async () => {
      //     const response = await fetch(latestApi, options);
      //     const data = await response.json();

      //     let latestMoviesArray = [];

      //     if (Array.isArray(data.results)) {
      //       latestMoviesArray = data.results;
      //     } else if (typeof data.results === "object") {
      //       latestMoviesArray = Object.values(data.results);
      //     }
      //     console.log(latestMoviesArray);
      //     setLatestMovies(latestMoviesArray);
      //   };

      handleTrendingMovies();
      handleUpcomingMovies();
      //   handleLatestMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [explore]);

  return (
    <>
      {!explore ? (
        <div className="flex flex-col">
          <h1>Trending Movies</h1>
          <div className="flex flex-wrap gap-12">
            {trendingMovies.map((movie) => (
              <div key={movie.id}>
                <MovieGrid movie={movie} />
              </div>
            ))}
          </div>

          <h1>Upcoming Movies</h1>
          <div className="flex flex-wrap gap-12">
            {upcomingMovies.map((movie) => (
              <div key={movie.id}>
                <MovieGrid movie={movie} />
              </div>
            ))}
          </div>

          {/* <h1>Latest Movies</h1>
          <div className="flex flex-row gap-12">
            {latestMovies.map((movie) => (
              <div key={movie.id}>
                <MovieGrid movie={movie} />
              </div>
            ))}
          </div> */}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default MoviesPage;
