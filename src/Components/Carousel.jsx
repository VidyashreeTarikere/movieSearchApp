import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const [swiperMovies, setSwiperMovies] = useState([]);

  const navigate = useNavigate();

  const swiperApi = `https://api.themoviedb.org/3/movie/now_playing`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  useEffect(() => {
    const handleSwiper = async () => {
      const response = await fetch(swiperApi, options);
      const data = await response.json();

      let swiperMoviesArray = [];

      if (Array.isArray(data.results)) {
        swiperMoviesArray = data.results;
      } else if (typeof data.results === "object") {
        swiperMoviesArray = Object.values(data.results);
      }

      setSwiperMovies(swiperMoviesArray.slice(0, 5));
    };
    handleSwiper();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(swiperMovies);

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {swiperMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="flex flex-col items-center justify-center">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="Movie poster"
                className=""
              />
              <button
                onClick={() => navigate(`/details/movie/${movie.id}`)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Movie Details
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Carousel;
