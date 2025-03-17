import React from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
const Header = () => {
  return (
    <div className="flex items-center justify-between text-sm py-4 border-b border-b-gray-400">
      <img className="w-44 cursor-pointer" src={assets.logo} alt="logo_image" />
      <ul className="hidden md:flex items-start font-medium">
        <NavLink>
          <li>HOME</li>
          <hr />
        </NavLink>
        <NavLink>
          <li>ALL DOCTORS</li>
          <hr />
        </NavLink>
        <NavLink>
          <li>ABOUT</li>
          <hr />
        </NavLink>
        <NavLink>
          <li>CONTACT</li>
          <hr />
        </NavLink>
      </ul>
      <div>
        <button>Create account</button>
      </div>
    </div>
  );
};

export default Header;
