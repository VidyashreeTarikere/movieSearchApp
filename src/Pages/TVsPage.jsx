import React from "react";
import TVFilter from "../Components/TVFilter";
import TVs from "../api/TVs";
import Search from "../Components/SearchBar";
import AISearch from "../Components/AISearchBar";

const TVsPage = ({ exploreType, setExploreType, explore, setExplore }) => {
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
