import React, { useContext, useEffect, useState } from "react";
import MovieGrid from "../Components/MovieGrid";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "react-horizontal-scrolling-menu/dist/styles.css";

const TVs = ({ explore }) => {
  const [trendingTV, setTrendingTV] = useState([]);
  const [onAirTV, setOnAirTV] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);

  const topRatedApi = `https://api.themoviedb.org/3/tv/top_rated?`;
  const trendingTVApi = `https://api.themoviedb.org/3/trending/tv/day?`;
  const onAirTVApi = `https://api.themoviedb.org/3/tv/on_the_air`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

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

      fetchAndSet(topRatedApi, setTopRatedTV);
      fetchAndSet(trendingTVApi, setTrendingTV);
      fetchAndSet(onAirTVApi, setOnAirTV, "tv");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [explore]);

  return (
    <>
      {!explore ? (
        <div className="flex-col w-full overflow-hidden inline-flex flex-nowrap">
          <h1 className="text-2xl font-bold m-4">Top-Rated TV Shows</h1>
          <ScrollMenu LeftArrow={<LeftArrow />} RightArrow={<RightArrow />}>
            {topRatedTV.map((movie) => (
              <div key={movie.id} itemId={movie.id.toString()} className="mx-4">
                <MovieGrid movie={movie} />
              </div>
            ))}
          </ScrollMenu>

          <h1 className="text-2xl font-bold m-4">Trending on TV</h1>
          <ScrollMenu LeftArrow={<LeftArrow />} RightArrow={<RightArrow />}>
            {trendingTV.map((movie) => (
              <div key={movie.id} itemId={movie.id.toString()} className="mx-4">
                <MovieGrid movie={movie} />
              </div>
            ))}
          </ScrollMenu>

          <h1 className="text-2xl font-bold m-4">On Air TV</h1>
          <ScrollMenu LeftArrow={<LeftArrow />} RightArrow={<RightArrow />}>
            {onAirTV.map((movie) => (
              <div key={movie.id} itemId={movie.id.toString()} className="mx-4">
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

export default TVs;
