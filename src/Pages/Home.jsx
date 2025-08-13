import React from "react";
import Search from "../Components/SearchBar";

import PopularMovie from "../api/PopularMovie";
import Carousel from "../Components/Carousel";

const Home = ({
  exploreType,
  setExploreType,
  explore,
  setExplore,
  countryCode,
}) => {
  return (
    <div>
      <Carousel />
      <div>
        <Search
          exploreType={exploreType}
          setExploreType={setExploreType}
          explore={explore}
          setExplore={setExplore}
        />
      </div>

      <div>
        <PopularMovie explore={explore} countryCode={countryCode} />
      </div>
    </div>
  );
};

export default Home;
