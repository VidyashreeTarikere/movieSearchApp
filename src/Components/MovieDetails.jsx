import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import grayUser from "../assets/icons8-grey.svg";
import Recommendations from "./Recommendations";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { supabase } from "../Utils/SupabaseClient";
import AddFavorite from "./AddFavorite";

const MovieDetails = ({ countryCode }) => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const [crew, setCrew] = useState([]);
  const [watchSite, setWatchSite] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [movieIds, setMovieIds] = useState([{ movie_id: null, type: "" }]);
  const [heart, setHeartRed] = useState({
    state: false,
    number: "0",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  const movieApi = `https://api.themoviedb.org/3/movie/${id}`;
  const movieVideoApi = `https://api.themoviedb.org/3/movie/${id}/videos`;
  const movieCrewApi = `https://api.themoviedb.org/3/movie/${id}/credits`;
  const movieWhereToWatchApi = `https://api.themoviedb.org/3/movie/${id}/watch/providers`;
  //   const tvApi = `https://api.themoviedb.org/3/tv/${id}`;

  useEffect(() => {
    const handleDisplayDetails = async () => {
      const response = await fetch(movieApi, options);
      const data = await response.json();
      console.log(data);

      setMovieIds([{ movie_id: data.id, type: "movie" }]);
      setDetails(data);
    };

    const handleGetVideos = async () => {
      const response = await fetch(movieVideoApi, options);
      const data = await response.json();

      let videosArray = [];

      if (Array.isArray(data.results)) {
        videosArray = data.results;
      } else if (typeof data.results === "object") {
        videosArray = Object.values(data.results);
      }

      setVideos(videosArray);
    };

    const handleGetCrew = async () => {
      const response = await fetch(movieCrewApi, options);
      const data = await response.json();
      console.log(data.cast);

      setCrew(data.cast);
    };

    handleDisplayDetails();
    handleGetVideos();
    handleGetCrew();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const handleWhereToWatch = async () => {
      const response = await fetch(movieWhereToWatchApi, options);
      const data = await response.json();

      console.log(data.results);

      const whereToWatchArray = data.results[countryCode];
      console.log(whereToWatchArray);

      const providerLinks = [
        ...(whereToWatchArray.flatrate || []),
        ...(whereToWatchArray.buy || []),
        ...(whereToWatchArray.rent || []),
      ];
      const uniqueProviders = Array.from(
        new Map(providerLinks.map((p) => [p.provider_id, p])).values()
      );

      //   setWhereToWatch(whereToWatchArray.link);
      setWatchSite(uniqueProviders);
    };
    handleWhereToWatch();
  }, [countryCode, id]);

  const allowedProviders = [
    { name: "Amazon Video", link: "https://www.amazon.com/video" },
    { name: "YouTube", link: "https://youtube.com" },
    { name: "Netflix", link: "https://www.netflix.com" },
    { name: "Apple TV", link: "https://tv.apple.com" },
    { name: "Rakuten TV", link: "https://www.rakuten.tv/" },
  ];

  const availableSites = watchSite
    .filter((v) => allowedProviders.some((p) => p.name === v.provider_name))
    .map((v) => {
      const provider = allowedProviders.find((p) => p.name === v.provider_name);
      return {
        ...v,
        link: provider ? provider.link : null,
      };
    });

  const trailers = videos.filter(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );

  const firstTrailer = trailers[0];

  const handleThumbnail = () => {
    // setShowPlayer(firstTrailer);
    setIsOpen(true);
    console.log("In handle");
  };

  const handleClose = () => {
    // setShowPlayer(null);
    setIsOpen(false);
  };

  const handleFavorite = () => {
    const newHeartState = !heart.state;
    setHeartRed({
      state: newHeartState,
      number: newHeartState ? "1" : "0",
    });

    const fetchUser = async () => {
      // setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user.id, details.id, newHeartState);
      // const userId = user.id;
      await AddFavorite(user.id, details.id, "movie", newHeartState);
    };
    fetchUser();
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("movie_id", id)
        .single();

      if (data) {
        setHeartRed({ state: true, number: "1" });
      }
    };
    fetchFavorites();
  }, [id]);

  return (
    <>
      {!details ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
              alt="Movie poster"
            />
            <img
              src={`https://image.tmdb.org/t/p/w500${details.backdrop_path}`}
              alt="Movie pic"
            />
            <h1>{details.name || details.title}</h1>
            <h2>{details.vote_average}</h2>

            {details &&
              details.genres &&
              details.genres.map((genre) => (
                <h1 key={genre.id}>{genre.name}</h1>
              ))}

            <div>
              <h3 className="text-lg font-semibold mb-2">Available on:</h3>
              {watchSite.length > 0 ? (
                <>
                  {availableSites.map((provider) => (
                    <a href={provider.link} target="_blank">
                      <img
                        key={provider.provider_id}
                        src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                        alt={provider.provider_name}
                        title={provider.provider_name}
                        className="w-10 h-10 rounded"
                      />
                    </a>
                  ))}
                </>
              ) : (
                <p>Not available for streaming.</p>
              )}
            </div>

            <div className="px-4 pb-4 pt-0 mt-2">
              <button
                className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={handleFavorite}
              >
                <span className="flex items-center gap-2">
                  {heart.state ? (
                    <HeartIconSolid className="h-5 w-5 text-red-500 rounded-lg hover:scale-105 focus:scale-95 transition-transform duration-200" />
                  ) : (
                    <HeartIconOutline className="h-5 w-5 text-gray-300 rounded-lg hover:scale-105 focus:scale-95 transition-transform duration-200" />
                  )}
                  {heart.number}
                </span>
              </button>
            </div>

            {firstTrailer && (
              <div onClick={() => handleThumbnail()}>
                <img
                  src={`https://img.youtube.com/vi/${firstTrailer.key}/maxresdefault.jpg`}
                  alt="Video Thumbnail"
                />

                <div className="bg-black/60 p-4 rounded-full">
                  <span className="text-white text-4xl">▶</span>
                </div>
              </div>
            )}

            {isOpen && (
              <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-white text-3xl"
                >
                  ✕
                </button>
                <div className="w-full max-w-5xl aspect-video">
                  <ReactPlayer
                    src={`https://www.youtube.com/watch?v=${firstTrailer.key}`}
                    playing
                    controls
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>
            )}

            <div>
              {crew.map((actor) => (
                <div key={actor.id}>
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : grayUser
                    }
                    alt={actor.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <span>{actor.name}</span>
                </div>
              ))}
            </div>

            <div>{details.overview}</div>
          </div>

          <Recommendations movieIds={movieIds} />
        </>
      )}
    </>
  );
};

export default MovieDetails;
