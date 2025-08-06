import React, { useEffect, useState } from "react";
import MovieGrid from "../Components/MovieGrid";

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
            return await response.json();
          })
        );

        console.log(data);
        setGetList(data);
      };
      handleGetList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [explore, movieIds]);

  return (
    <>
      {!explore ? (
        <div className="flex flex-col">
          <h1>Your Favorites</h1>
          <div className="flex flex-wrap gap-12">
            {getList.map((movie) => (
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

export default MyList;
