import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [validToken, setValidToken] = useState(true);

  const logout = () => {
    setValidToken(false);
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="logo_image"
      />
      <ul className="hidden md:flex items-start gap-5 font-medium text-sm lg:text-xl">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {validToken ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              onClick={() => navigate("/")}
              className="w-8 rounded-full"
              src={assets.profile_pic}
              alt="avatar"
            />
            <img
              onClick={() => navigate("/")}
              className="w-2.5"
              src={assets.dropdown_icon}
              alt="dropdown_icon"
            />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  className="hover:text-black cursor-pointer"
                  onClick={() => navigate("/my-profile")}
                >
                  My Profile
                </p>
                <p
                  className="hover:text-black cursor-pointer"
                  onClick={() => navigate("/my-appointments")}
                >
                  My Appointment
                </p>
                <p className="hover:text-black cursor-pointer" onClick={logout}>
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-4 rounded-full font-medium hidden md:block cursor-pointer"
          >
            Create account
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
