import React, { useContext, useEffect, useState } from "react";
import MovieGrid from "../Components/MovieGrid";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "react-horizontal-scrolling-menu/dist/styles.css";

const MoviesPage = ({ explore }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  // const nowPlayingApi = `https://api.themoviedb.org/3/movie/now_playing?`

  // trending movies
  const trendingApi = `https://api.themoviedb.org/3/trending/movie/day?`;

  //Upcoming movies
  const upcomingApi = `https://api.themoviedb.org/3/movie/upcoming`;

  // const topRatedApi = `https://api.themoviedb.org/3/movie/top_rated?`;

  const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext);
    return (
      <>
        <div className="hidden lg:flex lg:items-center md:flex md:items-center xl:flex xl:items-center">
          <button
            className="p-5 h-30 bg-gray-300 rounded-full shadow flex items-center justify-center"
            onClick={() => scrollPrev()}
          >
            <FaChevronLeft />
          </button>
        </div>
      </>
    );
  };

  const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext);
    return (
      <>
        <div className="hidden lg:flex lg:items-center md:flex md:items-center xl:flex xl:items-center">
          <button
            className="p-5 h-30 bg-gray-300 rounded-full shadow flex items-center justify-center"
            onClick={() => scrollNext()}
          >
            <FaChevronRight />
          </button>
        </div>
      </>
    );
  };

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

        setUpcomingMovies(
          upcomingMoviesArray.map((item) => ({
            ...item,
            media_type: "movie",
          }))
        );
      };

      handleTrendingMovies();
      handleUpcomingMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [explore]);

  return (
    <>
      {!explore ? (
        <div className="flex-col w-full overflow-hidden inline-flex flex-nowrap">
          <h1 className="text-2xl font-bold m-4">Trending Movies</h1>
          <ScrollMenu LeftArrow={<LeftArrow />} RightArrow={<RightArrow />}>
            {trendingMovies.map((movie) => (
              <div key={movie.id} className="mx-4">
                <MovieGrid movie={movie} />
              </div>
            ))}
          </ScrollMenu>

          <h1 className="text-2xl font-bold m-4">Upcoming Movies</h1>
          <ScrollMenu LeftArrow={<LeftArrow />} RightArrow={<RightArrow />}>
            {upcomingMovies.map((movie) => (
              <div key={movie.id} className="mx-4">
                <MovieGrid movie={movie} />
              </div>
            ))}
          </ScrollMenu>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default MoviesPage;
