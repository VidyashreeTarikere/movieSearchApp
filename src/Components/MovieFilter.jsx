import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import clsx from "clsx";
import MovieGrid from "./MovieGrid";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "react-horizontal-scrolling-menu/dist/styles.css";

const MovieFilter = ({ exploreType, setExploreType, explore, setExplore }) => {
  const [genresArray, setGenresArray] = useState([]);
  const [genreSearch, setGenreSearch] = useState();
  const [genreSearchTextContent, setGenreSearchTextContent] = useState();
  const [searchArray, setSearchArray] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [isEmpty, setIsEmpty] = useState();

  const api = `https://api.themoviedb.org/3/genre/movie/list?'`;
  const genreApi = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreSearch}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  const handleGenre = async () => {
    const response = await fetch(api, options);
    const data = await response.json();

    let parsedGenres = [];
    if (Array.isArray(data.genres)) {
      parsedGenres = data.genres;
    } else if (typeof data.genres === "object") {
      parsedGenres = Object.values(data.genres);
    }

    setGenresArray(parsedGenres);

    console.log(parsedGenres);
  };

  const handleGenreSelection = async (e) => {
    e.preventDefault();
    setGenreSearch(e.target.value);
    setGenreSearchTextContent(e.target.textContent);

    try {
      setSpinner(true);
      setExplore(true);
      setExploreType("genre");
      const response = await fetch(genreApi, options);
      const data = await response.json();

      // console.log(data);
      let genreSearchArray = [];

      setSpinner(false);

      if (Array.isArray(data.results)) {
        genreSearchArray = data.results;
      } else if (typeof data.results === "object") {
        genreSearchArray = Object.values(data.results);
      }

      setIsEmpty(genreSearchArray.length);
      setSearchArray(genreSearchArray);
    } catch (err) {
      console.log(err);
    } finally {
      setSpinner(false);
    }
  };

  const LeftArrow = () => {
    const { scrollPrev } = React.useContext(VisibilityContext);
    return (
      <button
        className="p-2 bg-white rounded-full shadow"
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
        className="p-2 bg-white rounded-full shadow"
        onClick={() => scrollNext()}
      >
        <FaChevronRight />
      </button>
    );
  };

  return (
    <>
      <div>
        <Menu className="relative inline-block text-left">
          <div>
            <MenuButton as={Fragment}>
              {({ active }) => (
                <button
                  onClick={handleGenre}
                  className={clsx(
                    active &&
                      "inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                  )}
                >
                  Movie Genre
                </button>
              )}
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                {/* <form action="#" method="POST"> */}
                {genresArray.map((genre) => (
                  <MenuItem key={genre.id} as={Fragment}>
                    {({ close }) => (
                      <button
                        type="button"
                        onClick={(e) => {
                          handleGenreSelection(e);
                          close(); // ⬅️ closes the dropdown
                        }}
                        value={genre.id}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        {genre.name}
                      </button>
                    )}
                  </MenuItem>
                ))}
                {/* </form> */}
              </div>
            </MenuItems>
          </div>
        </Menu>
      </div>

      {!spinner && exploreType === "genre" && isEmpty === 0 && (
        <div>
          <h2>No movies found. Try a different search</h2>
        </div>
      )}

      {explore && exploreType === "genre" && !spinner && isEmpty > 0 ? (
        <div className="flex-col w-full overflow-hidden inline-flex flex-nowrap">
          <h1 className="text-2xl font-bold m-4">
            Movies in {genreSearchTextContent}
          </h1>
          <ScrollMenu LeftArrow={<LeftArrow />} RightArrow={<RightArrow />}>
            {searchArray.map((movie) => (
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

export default MovieFilter;
