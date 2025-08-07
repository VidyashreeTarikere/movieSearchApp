import React from "react";
import { useNavigate } from "react-router-dom";
import TVFilter from "../Components/TVFilter";
import TVs from "../api/TVs";
import Search from "../Components/SearchBar";

const TVsPage = ({ exploreType, setExploreType, explore, setExplore }) => {
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
        <TVFilter
          exploreType={exploreType}
          setExploreType={setExploreType}
          explore={explore}
          setExplore={setExplore}
        />
      </div>

      <div>
        <TVs explore={explore} />
      </div>
    </div>
  );
};

export default TVsPage;
