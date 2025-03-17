import React from "react";
import { Banner, Specialty, TopDoctors } from "../components";

const Home = () => {
  return (
    <div className="mt-6">
      <Banner />
      <Specialty />
      <TopDoctors />
    </div>
  );
};

export default Home;
