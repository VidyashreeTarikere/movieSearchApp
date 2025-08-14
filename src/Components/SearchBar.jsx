import React, { useState, useContext } from "react";
import { Spinner } from "react-spinner-toolkit";
import MovieGrid from "./MovieGrid";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "react-horizontal-scrolling-menu/dist/styles.css";

const Search = ({ exploreType, setExploreType, explore, setExplore }) => {
  const [search, setSearch] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [isEmpty, setIsEmpty] = useState();
  const [moviesArray, setMoviesArray] = useState([]);

  const api = `https://api.themoviedb.org/3/search/multi?query=${search}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSpinner(true);
      setExplore(true);
      setExploreType("search");
      const response = await fetch(api, options);
      const data = await response.json();
      console.log(data);
      let parsedArray = [];

      setSpinner(false);

      if (Array.isArray(data.results)) {
        parsedArray = data.results;
      } else if (typeof data.results === "object") {
        parsedArray = Object.values(data.results);
      }

      setIsEmpty(parsedArray.length);
      setMoviesArray(parsedArray);
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
      <div>
        <div className="flex justify-center w-full mt-4">
          <form
            className="flex items-center w-2/3 max-w-xl"
            onSubmit={handleSubmit}
          >
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative w-full items-center">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>

              <input
                type="text"
                id="search"
                value={search}
                onInput={handleSearch}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full pl-10 p-2.5"
                placeholder="Search Movies or TV shows"
                required
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-gray-500 rounded-lg border border-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <svg
                className="mr-2 -ml-1 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </form>
        </div>
      </div>
      <div>
        {spinner && (
          <div className="flex items-center justify-center min-h-1/2">
            <Spinner
              shape="circle"
              color="#000000"
              loading
              speed={1}
              size={200}
              transition={true}
            />
          </div>
        )}

        <div>
          {!spinner && exploreType === "search" && explore && isEmpty > 0 && (
            <div className="flex-col w-full overflow-hidden inline-flex flex-nowrap">
              <ScrollMenu LeftArrow={<LeftArrow />} RightArrow={<RightArrow />}>
                {moviesArray.map((movie) => (
                  <div className="mx-4" key={movie.id}>
                    <MovieGrid movie={movie} />
                  </div>
                ))}
              </ScrollMenu>
            </div>
          )}
        </div>

        {!spinner && exploreType === "search" && isEmpty === 0 && (
          <div>
            <h2>No movies found. Try a different search</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
