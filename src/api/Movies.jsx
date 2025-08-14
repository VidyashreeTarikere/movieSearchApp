import React, { useContext, useEffect, useState } from "react";
import MovieGrid from "../Components/MovieGrid";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "react-horizontal-scrolling-menu/dist/styles.css";

const MoviesPage = ({ explore }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  const nowPlayingApi = `https://api.themoviedb.org/3/movie/now_playing?`;
  const trendingApi = `https://api.themoviedb.org/3/trending/movie/day?`;
  const upcomingApi = `https://api.themoviedb.org/3/movie/upcoming`;
  const topRatedApi = `https://api.themoviedb.org/3/movie/top_rated?`;

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
      const fetchAndSet = async (url, setter, mediaType = null) => {
        const response = await fetch(url, options);
        const data = await response.json();

        let items = [];
        if (Array.isArray(data.results)) {
          items = data.results;
        } else if (typeof data.results === "object" && data.results !== null) {
          items = Object.values(data.results);
        }

        const processedItems = mediaType
          ? items.map((item) => ({ ...item, media_type: mediaType }))
          : items;

        setter(processedItems);
      };

      fetchAndSet(nowPlayingApi, setNowPlayingMovies, "movie");
      fetchAndSet(trendingApi, setTrendingMovies);
      fetchAndSet(upcomingApi, setUpcomingMovies, "movie");
      fetchAndSet(topRatedApi, setTopRatedMovies, "movie");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [explore]);

  return (
    <>
      {!explore ? (
        <div className="flex-col w-full overflow-hidden inline-flex flex-nowrap">
          <h1 className="text-2xl font-bold m-4">Now Playing</h1>
          <ScrollMenu LeftArrow={<LeftArrow />} RightArrow={<RightArrow />}>
            {nowPlayingMovies.map((movie) => (
              <div key={movie.id} className="mx-4">
                <MovieGrid movie={movie} />
              </div>
            ))}
          </ScrollMenu>

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

          <h1 className="text-2xl font-bold m-4">Top Rated Movies</h1>
          <ScrollMenu LeftArrow={<LeftArrow />} RightArrow={<RightArrow />}>
            {topRatedMovies.map((movie) => (
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
