import React from "react";
import Search from "../Components/SearchBar";
import AISearch from "../Components/AISearchBar";
import MovieFilter from "../Components/MovieFilter";
import MoviesPage from "../api/Movies";

const Movies = ({ exploreType, setExploreType, explore, setExplore }) => {
  return (
    <div>
      <div className="flex flex-row">
        <div className="relative w-1/2">
          <Search
            exploreType={exploreType}
            setExploreType={setExploreType}
            explore={explore}
            setExplore={setExplore}
          />
        </div>
        <div className="relative w-1/2">
          <AISearch />
        </div>
      </div>
      <div className="pl-30">
        <MovieFilter
          exploreType={exploreType}
          setExploreType={setExploreType}
          explore={explore}
          setExplore={setExplore}
        />
      </div>

      <div>
        <MoviesPage explore={explore} />
      </div>
    </div>
  );
};

export default Movies;
