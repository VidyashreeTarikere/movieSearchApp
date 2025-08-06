import React, { useEffect, useState } from "react";
import MovieGrid from "../Components/MovieGrid";

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

        setOnAirTV(onAirTVArray);
      };
      handleTrendingTV();
      handleOnAirTV();
    }
  });
  return (
    <>
      {!explore ? (
        <div className="flex flex-col">
          <h1>Trending TV</h1>
          <div className="flex flex-wrap gap-12">
            {trendingTV.map((movie) => (
              <div key={movie.id}>
                <MovieGrid movie={movie} />
              </div>
            ))}
          </div>

          <h1>On Air TV</h1>
          <div className="flex flex-wrap gap-12">
            {onAirTV.map((movie) => (
              <div key={movie.id}>
                <MovieGrid movie={movie} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default TVs;
