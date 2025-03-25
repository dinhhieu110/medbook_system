import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const Header = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userDetails } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className="flex p-2 items-center justify-between text-sm py-6 mb-5 border-b border-b-gray-400">
      {/* <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="logo_image"
      /> */}
      <h1
        onClick={() => navigate("/")}
        className="text-3xl text-primary font-bold cursor-pointer hover:text-blue-400"
      >
        Wilson's Hospital
      </h1>
      <ul className="hidden md:flex items-start gap-5 font-medium text-sm xl:text-xl">
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
        {token && userDetails ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              onClick={() => navigate("/")}
              className="w-8 h-8 object-cover rounded-full "
              src={userDetails.image}
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
            className="bg-primary text-white px-2 lg:px-8 py-1 md:py-4 rounded-full font-medium hidden md:block cursor-pointer"
          >
            Create account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt="menu_icon"
        />
        {/* Mobile menu */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-500`}
        >
          <div className=" flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 txt-lg font-medium">
            <NavLink
              onClick={() => {
                setShowMenu(false);
              }}
              to="/"
            >
              <p className="px-4 py-2 rounded inline-block">HOME</p>
            </NavLink>
            <NavLink
              onClick={() => {
                setShowMenu(false);
              }}
              to="/doctors"
            >
              <p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p>
            </NavLink>
            <NavLink
              onClick={() => {
                setShowMenu(false);
              }}
              to="/about"
            >
              <p className="px-4 py-2 rounded inline-block">ABOUT</p>
            </NavLink>
            <NavLink
              onClick={() => {
                setShowMenu(false);
              }}
              to="/contact"
            >
              <p className="px-4 py-2 rounded inline-block">CONTACT</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
