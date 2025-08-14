import React, { useEffect, useState, useContext } from "react";
import MovieGrid from "../Components/MovieGrid";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "react-horizontal-scrolling-menu/dist/styles.css";

const MyList = ({ movieIds, explore }) => {
  const [getList, setGetList] = useState([]);

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  useEffect(() => {
    if (!explore) {
      const handleGetList = async () => {
        const data = await Promise.all(
          movieIds.map(async ({ movie_id, type }) => {
            const response = await fetch(
              `https://api.themoviedb.org/3/${type}/${movie_id}`,
              options
            );
            const result = await response.json();
            return { ...result, media_type: type };
          })
        );

        setGetList(data);
      };
      handleGetList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [explore, movieIds]);

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

  return (
    <>
      {!explore ? (
        <div className="flex-col w-full overflow-hidden inline-flex flex-nowrap">
          <h1 className="text-2xl font-bold m-4">Your Favorites</h1>
          <ScrollMenu LeftArrow={<LeftArrow />} RightArrow={<RightArrow />}>
            {getList.map((movie) => (
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

export default MyList;
