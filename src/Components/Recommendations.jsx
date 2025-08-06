import React, { useEffect, useState } from "react";
import MovieGrid from "./MovieGrid";

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

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold mb-2">Recommended for You:</h1>
      {recommendations.map((recGroup) =>
        recGroup.results.length ? (
          <div key={recGroup.sourceId}>
            <div className="flex flex-wrap gap-6">
              {recGroup.results.map((movie) => (
                <MovieGrid key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        ) : (
          <div>Sorry no recommendations for you!</div>
        )
      )}
    </div>
  );
};

export default Recommendations;
