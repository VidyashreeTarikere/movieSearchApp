import React, { useState, useContext } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import clsx from "clsx";
import MovieGrid from "./MovieGrid";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "react-horizontal-scrolling-menu/dist/styles.css";

const TVFilter = ({ exploreType, setExploreType, explore, setExplore }) => {
  const [genresArray, setGenresArray] = useState([]);
  const [genreSearch, setGenreSearch] = useState();
  const [genreSearchTextContent, setGenreSearchTextContent] = useState();
  const [searchArray, setSearchArray] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [isEmpty, setIsEmpty] = useState();

  const api = `https://api.themoviedb.org/3/genre/tv/list?'`;
  const genreApi = `https://api.themoviedb.org/3/discover/tv?with_genres=${genreSearch}`;
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
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
    const { scrollPrev } = useContext(VisibilityContext);
    return (
      <>
        <div className="hidden lg:flex lg:items-center md:flex md:items-center xl:flex xl:items-center">
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
        <div className="hidden lg:flex lg:items-center md:flex md:items-center xl:flex xl:items-center">
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
    <>
      <div className="flex justify-end pr-5">
        <Menu className="relative inline-block text-right">
          <div>
            <MenuButton as={Fragment}>
              {({ active }) => (
                <button
                  onClick={handleGenre}
                  className={clsx(
                    "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded",
                    active && "bg-gray hover:bg-gray-50 text-gray-900"
                  )}
                >
                  Genre
                </button>
              )}
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-500 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
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
                          close();
                        }}
                        value={genre.id}
                        className="block w-full px-4 py-2 text-left text-sm text-white data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
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
          <h2>No TV Shows found. Try a different search</h2>
        </div>
      )}

      {explore && exploreType === "genre" && !spinner && isEmpty > 0 ? (
        <div className="flex-col w-full overflow-hidden inline-flex flex-nowrap">
          <h1 className="text-2xl font-bold m-4">
            TV Shows in {genreSearchTextContent}
          </h1>
          <ScrollMenu LeftArrow={<LeftArrow />} RightArrow={<RightArrow />}>
            {searchArray.map((movie) => (
              <div key={movie.id} className="mx-4">
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

export default TVFilter;
