import React, { useEffect, useState, useContext } from "react";
import MovieGrid from "./MovieGrid";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "react-horizontal-scrolling-menu/dist/styles.css";

const Recommendations = ({ movieIds }) => {
  const [recommendations, setRecommendations] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await Promise.all(
          movieIds.map(async ({ movie_id, type }) => {
            const response = await fetch(
              `https://api.themoviedb.org/3/${type}/${movie_id}/recommendations`,
              options
            );
            const json = await response.json();
            return {
              sourceId: movie_id,
              sourceType: type,
              results: json.results?.slice(0, 5) || [],
            };
          })
        );

        setRecommendations(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setRecommendations([]);
      }
    };
    fetchRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieIds]);

  const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext);
    return (
      <>
        <div className="flex items-center">
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
        <div className="flex items-center">
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
    <div className="flex-col w-full overflow-hidden">
      <h1 className="text-2xl font-bold m-4">Recommended for You</h1>

      {recommendations.every((recGroup) => recGroup.results.length === 0) ? (
        <div className="text-center text-gray-500 my-4">
          Sorry, no recommendations for you!
        </div>
      ) : (
        <ScrollMenu LeftArrow={<LeftArrow />} RightArrow={<RightArrow />}>
          {recommendations.flatMap((recGroup) =>
            recGroup.results.map((movie) => (
              <div key={`${recGroup.sourceId}-${movie.id}`} className="mx-4">
                <MovieGrid movie={movie} />
              </div>
            ))
          )}
        </ScrollMenu>
      )}
    </div>
  );
};

export default Recommendations;
