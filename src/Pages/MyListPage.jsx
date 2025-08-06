import React from "react";
import GetMyList from "../Components/GetMyList";
import Search from "../Components/SearchBar";
import AISearch from "../Components/AISearchBar";

const MyListPage = ({ exploreType, setExploreType, explore, setExplore }) => {
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
      <div>
        <GetMyList explore={explore} />
      </div>
    </div>
  );
};

export default MyListPage;
