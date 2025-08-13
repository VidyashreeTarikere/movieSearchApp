import { useEffect, useState } from "react";
import MovieGrid from "../Components/MovieGrid";

const PopularMovie = ({ explore, countryCode }) => {
  const [famousMovie, setFamousMovie] = useState([]);
  const [famousTV, setFamousTV] = useState([]);
  const [moviesRegion, setMoviesRegion] = useState([]);
  const [tvRegion, setTvRegion] = useState([]);

  const apiMovie = `https://api.themoviedb.org/3/movie/popular`;
  const apiTV = `https://api.themoviedb.org/3/tv/popular`;
  const moviesInYourRegionApi = `https://api.themoviedb.org/3/discover/movie?watch_region=${countryCode}`;
  const tvInYourRegionApi = `https://api.themoviedb.org/3/discover/tv?watch_region=${countryCode}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  useEffect(() => {
    if (!explore) {
      const fetchAndSet = async (url, mediaType, setter) => {
        const response = await fetch(url, options);
        const data = await response.json();

        let items = [];
        if (Array.isArray(data.results)) {
          items = data.results;
        } else if (typeof data.results === "object" && data.results !== null) {
          items = Object.values(data.results);
        }

        setter(
          items.map((item) => ({
            ...item,
            media_type: mediaType,
          }))
        );
      };

      fetchAndSet(apiMovie, "movie", setFamousMovie);
      fetchAndSet(apiTV, "tv", setFamousTV);
      fetchAndSet(moviesInYourRegionApi, "movie", setMoviesRegion);
      fetchAndSet(tvInYourRegionApi, "tv", setTvRegion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [explore]);

  return (
    <>
      {!explore ? (
        <div className="flex-col w-full overflow-hidden inline-flex flex-nowrap">
          <h1 className="text-2xl font-bold m-4">Popular Movies</h1>
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none  animate-infinite-scroll">
            {famousMovie.map((movie) => (
              <li key={movie.id}>
                <div className="hover:scale-110 transition-transform duration-300">
                  <MovieGrid movie={movie} />
                </div>
              </li>
            ))}
          </ul>

          <h1 className="text-2xl font-bold m-4">Popular TV Shows</h1>
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-reverse-scroll">
            {famousTV.map((tv) => (
              <li key={tv.id}>
                <div className="hover:scale-110 transition-transform duration-300">
                  <MovieGrid movie={tv} />
                </div>
              </li>
            ))}
          </ul>

          <h1 className="text-2xl font-bold m-4">Movies in {countryCode}</h1>
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-reverse-scroll">
            {moviesRegion.map((tv) => (
              <li key={tv.id}>
                <div className="hover:scale-110 transition-transform duration-300">
                  <MovieGrid movie={tv} />
                </div>
              </li>
            ))}
          </ul>

          <h1 className="text-2xl font-bold m-4">TV shows in {countryCode}</h1>
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-reverse-scroll">
            {tvRegion.map((tv) => (
              <li key={tv.id}>
                <div className="hover:scale-110 transition-transform duration-300">
                  <MovieGrid movie={tv} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default PopularMovie;
