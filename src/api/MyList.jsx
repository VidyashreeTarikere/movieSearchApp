import React, { useEffect, useState } from "react";
import MovieGrid from "../Components/MovieGrid";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "react-horizontal-scrolling-menu/dist/styles.css";

const MyList = ({ movieIds, explore }) => {
  const [getList, setGetList] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
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

        console.log(data);
        setGetList(data);
      };
      handleGetList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [explore, movieIds]);

  const LeftArrow = () => {
    const { scrollPrev } = React.useContext(VisibilityContext);
    return (
      <button
        className="p-5 bg-white rounded-full shadow"
        onClick={() => scrollPrev()}
      >
        <FaChevronLeft />
      </button>
    );
  };

  const RightArrow = () => {
    const { scrollNext } = React.useContext(VisibilityContext);
    return (
      <button
        className="p-5 bg-white rounded-full shadow"
        onClick={() => scrollNext()}
      >
        <FaChevronRight />
      </button>
    );
  };

  return (
    <>
      {!explore ? (
        <div className="flex-col w-full overflow-hidden inline-flex flex-nowrap">
          <h1 className="text-2xl font-bold m-4">Your Favorites</h1>
          <ScrollMenu LeftArrow={<LeftArrow />} RightArrow={<RightArrow />}>
            {getList.map((movie) => (
              <div key={movie.id} className="mx-2">
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
