import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import grayUser from "../assets/icons8-grey.svg";
import Recommendations from "./Recommendations";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { supabase } from "../Utils/SupabaseClient";
import AddFavorite from "./AddFavorite";

const MovieDetails = ({ countryCode }) => {
  const { type, id } = useParams();
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

  const history = useNavigate();

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  const movieApi = `https://api.themoviedb.org/3/${type}/${id}`;
  const movieVideoApi = `https://api.themoviedb.org/3/${type}/${id}/videos`;
  const movieCrewApi = `https://api.themoviedb.org/3/${type}/${id}/credits`;
  const movieWhereToWatchApi = `https://api.themoviedb.org/3/${type}/${id}/watch/providers`;

  useEffect(() => {
    const handleDisplayDetails = async () => {
      const response = await fetch(movieApi, options);
      const data = await response.json();

      setMovieIds([{ movie_id: data.id, type: type }]);
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

      // console.log(data.results);

      const whereToWatchArray = data.results[countryCode];

      const providerLinks = [
        ...(whereToWatchArray?.flatrate || []),
        ...(whereToWatchArray?.buy || []),
        ...(whereToWatchArray?.rent || []),
      ];
      const uniqueProviders = Array.from(
        new Map(providerLinks.map((p) => [p.provider_id, p])).values()
      );

      setWatchSite(uniqueProviders);
    };
    handleWhereToWatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleFavorite = () => {
    const newHeartState = !heart.state;
    setHeartRed({
      state: newHeartState,
      number: newHeartState ? "1" : "0",
    });

    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      await AddFavorite(user.id, details.id, type, newHeartState);
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
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center text-white py-10">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            Loading...
          </div>
        </div>
      ) : (
        <>
          <div className="min-h-screen">
            <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-8">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg cursor-pointer"
                onClick={() => history(-1)}
              >
                Back
              </button>
            </div>

            <div className="relative">
              <div className="relative h-80 sm:h-80 lg:h-96 overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
                  alt="Movie pic"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
              </div>

              <div className="px-4 sm:px-6 lg:px-8">
                <div className="relative -mt-32 sm:-mt-40 lg:-mt-48">
                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    <div className="flex-shrink-0 mx-auto lg:mx-0">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                        alt="Movie poster"
                        className="w-48 sm:w-56 lg:w-64 rounded-lg shadow-2xl border-4 border-gray-700"
                      />
                    </div>

                    <div className="flex-1 text-center lg:text-left lg:pt-8">
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">
                        {details.name || details.title}
                      </h1>

                      <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                        {Array.from({ length: 5 }).map((_, i) => {
                          const rating = details.vote_average / 2;
                          return (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(rating)
                                  ? "text-yellow-400"
                                  : i < rating
                                  ? "text-yellow-400/50"
                                  : "text-gray-500"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.956c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.956a1 1 0 00-.364-1.118L2.042 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.957z" />
                            </svg>
                          );
                        })}
                        <span className="text-lg text-gray-300 ml-2">
                          {(details.vote_average / 2).toFixed(1)} of 5
                        </span>
                      </div>

                      <div className="mb-6">
                        <button
                          className="inline-flex items-center gap-3 rounded-lg bg-gray-800 py-3 px-6 text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                          type="button"
                          onClick={handleFavorite}
                        >
                          <span className="flex items-center gap-2">
                            {heart.state ? (
                              <HeartIconSolid className="h-8 w-8 text-red-500 rounded-lg hover:scale-105 focus:scale-95 transition-transform duration-200" />
                            ) : (
                              <HeartIconOutline className="h-8 w-8 text-gray-300 rounded-lg hover:scale-105 focus:scale-95 transition-transform duration-200" />
                            )}
                            {heart.number}
                          </span>
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
                        {details &&
                          details.genres &&
                          details.genres.map((genre) => (
                            <span
                              className="inline-flex items-center rounded-full bg-gray-700 px-3 py-1 text-sm font-medium text-white"
                              key={genre.id}
                            >
                              {genre.name}
                            </span>
                          ))}
                      </div>

                      <div className="text-gray-300 max-w-3xl">
                        <h2 className="text-xl">Overview</h2>
                        <p className="text-sm sm:text-base leading-relaxed">
                          {details.overview}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Available on:
              </h3>
              {watchSite.length > 0 ? (
                <div className="flex gap-3 flex-wrap">
                  {availableSites.map((provider) => (
                    <a
                      key={provider.provider_id}
                      href={provider.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group transition-transform duration-200 hover:scale-105"
                    >
                      <div className="bg-gray-700 hover:bg-gray-600 rounded-lg p-3 transition-colors duration-200">
                        <img
                          key={provider.provider_id}
                          src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                          alt={provider.provider_name}
                          title={provider.provider_name}
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded object-cover"
                        />
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-lg">
                  Not available for streaming in your region.
                </p>
              )}
            </div>

            {firstTrailer && (
              <div className="px-4 sm:px-6 lg:px-8 py-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  Trailer
                </h3>
                <div
                  className="relative group cursor-pointer rounded-lg overflow-hidden shadow-2xl max-w-4xl"
                  onClick={handleThumbnail}
                >
                  <img
                    src={`https://img.youtube.com/vi/${firstTrailer.key}/maxresdefault.jpg`}
                    alt="Video Thumbnail"
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-red-600 rounded-full p-4 sm:p-6 group-hover:bg-red-500 transition-colors duration-300 shadow-lg">
                      <svg
                        className="w-8 h-8 sm:w-12 sm:h-12 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isOpen && (
              <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors duration-200 z-10"
                >
                  ✕
                </button>
                <div className="w-full max-w-6xl aspect-video">
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

            <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Cast
              </h3>
              <div className="overflow-x-auto">
                <div
                  className="flex gap-4 sm:gap-6 pb-4"
                  style={{ width: "max-content" }}
                >
                  {crew.slice(0, 15).map((actor) => (
                    <div
                      key={actor.id}
                      className="flex flex-col items-center flex-shrink-0"
                    >
                      <div className="relative group">
                        <img
                          src={
                            actor.profile_path
                              ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                              : grayUser
                          }
                          alt={actor.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full object-cover shadow-lg transition-transform duration-200 group-hover:scale-105"
                        />
                      </div>

                      <div className="mt-3 text-center max-w-24 sm:max-w-28">
                        <span className="text-white text-sm sm:text-base font-medium block">
                          {actor.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-6 lg:px-8 pb-12">
              <Recommendations movieIds={movieIds} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MovieDetails;
