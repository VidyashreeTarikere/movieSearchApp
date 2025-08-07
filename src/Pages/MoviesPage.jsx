import React from "react";
import { useNavigate } from "react-router-dom";
import Search from "../Components/SearchBar";

import MovieFilter from "../Components/MovieFilter";
import MoviesPage from "../api/Movies";

const Movies = ({ exploreType, setExploreType, explore, setExplore }) => {
  const history = useNavigate();
  return (
    <div>
      <div>
        <button onClick={() => history(-1)}>Back</button>
      </div>
      <div className="flex flex-row">
        <div className="relative w-1/2">
          <Search
            exploreType={exploreType}
            setExploreType={setExploreType}
            explore={explore}
            setExplore={setExplore}
          />
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
