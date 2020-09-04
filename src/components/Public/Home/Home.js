import React from "react";
import HomeSlider from "./HomeSlider";
import HomeServices from "./HomeServices";
import HomeEvent from "./HomeEvent";
import HomeArticle from "./HomeArticle";
import HomeLogo from "./HomeLogo";
import HomeBenefit from "./HomeBenefit";

const Home = () => {
  
  return (
    <main>
      <HomeSlider />
      <HomeServices />
      <HomeBenefit />
      <HomeEvent />
      <HomeArticle />
      <HomeLogo />
    </main>
  );
};

export default Home;
