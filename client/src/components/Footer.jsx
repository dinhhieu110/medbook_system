import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-xs">
        {/* Left */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="logo_image" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            eveniet voluptatibus a dolorem facere quas delectus hic
            necessitatibus obcaecati, optio doloremque nemo dolore error facilis
            quaerat sint non! Magni, error.
          </p>
        </div>

        {/* Center */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Right */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>0702.662.251</li>
            <li>trandinhhieu11002@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        {/* Copyright */}
        <hr className="border-none outline-none h-0.5 bg-gray-100 w-full m-auto" />
        <p className="py-5 text-sm font-light text-center">
          Copyright 2025@ MedicalHospital - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
