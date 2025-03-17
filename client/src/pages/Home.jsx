import React from "react";
import { Banner, Specialty, TopDoctors } from "../components";

const Home = () => {
  return (
    <div>
      <Banner />
      <Specialty />
      <TopDoctors />
      <Banner />
    </div>
  );
};

export default Home;
