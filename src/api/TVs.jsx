import React, { useContext, useEffect, useState } from "react";
import MovieGrid from "../Components/MovieGrid";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "react-horizontal-scrolling-menu/dist/styles.css";

const TVs = ({ explore }) => {
  const [trendingTV, setTrendingTV] = useState([]);
  const [onAirTV, setOnAirTV] = useState([]);

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
      const handleTrendingTV = async () => {
        const response = await fetch(trendingTVApi, options);
        const data = await response.json();

        let trendingTVArray = [];

        if (Array.isArray(data.results)) {
          trendingTVArray = data.results;
        } else if (typeof data.results === "object") {
          trendingTVArray = Object.values(data.results);
        }

        setTrendingTV(trendingTVArray);
      };

      const handleOnAirTV = async () => {
        const response = await fetch(onAirTVApi, options);
        const data = await response.json();

        let onAirTVArray = [];

        if (Array.isArray(data.results)) {
          onAirTVArray = data.results;
        } else if (typeof data.results === "object") {
          onAirTVArray = Object.values(data.results);
        }

        setOnAirTV(
          onAirTVArray.map((item) => ({
            ...item,
            media_type: "tv",
          }))
        );
      };
      handleTrendingTV();
      handleOnAirTV();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [explore]);

  return (
    <>
      {!explore ? (
        <div className="flex-col w-full overflow-hidden inline-flex flex-nowrap">
          <h1 className="text-2xl font-bold m-4">Trending TV</h1>
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
