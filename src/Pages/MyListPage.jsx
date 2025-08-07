import React from "react";
import { useNavigate } from "react-router-dom";
import GetMyList from "../Components/GetMyList";
import Search from "../Components/SearchBar";

const MyListPage = ({ exploreType, setExploreType, explore, setExplore }) => {
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
      <div>
        <GetMyList explore={explore} />
      </div>
    </div>
  );
};

export default MyListPage;
