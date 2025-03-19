import React, { use, useState } from 'react';
import { assets } from '../assets/assets';

const MyProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Wilson Tran',
    image: assets.profile_pic,
    email: 'wilsontran@gmail.com',
    phone: '+84 702 662 252',
    address: {
      line1: '100 Bach Dang',
      line2: 'Hai Chau, Da Nang',
    },
    gender: 'Male',
    dob: 'October, 1st 2002',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      <img className="w-36 rounded" src={userInfo.image} alt="user_image" />
      {isEditMode ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          onChange={(e) =>
            setUserInfo((prev) => ({ ...prev, name: e.target.value }))
          }
          value={userInfo.name}
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userInfo.name}
        </p>
      )}
      <hr className="bg-zinc-400 h-[1px] border-none" />
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-400">{userInfo.email}</p>
          <p className="font-medium">Phone:</p>
          {isEditMode ? (
            <input
              className="bg-gray-100 max-w-52"
              type="text"
              value={userInfo.phone}
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-400">{userInfo.phone}</p>
          )}
          <p className="font-medium">Address:</p>
          {isEditMode ? (
            <p>
              <input
                className="bg-gray-50"
                type="text"
                value={userInfo.address.line1}
                onChange={(e) =>
                  setUserInfo((prev) => ({
                    ...prev,
                    address: { ...prev, line1: e.target.value },
                  }))
                }
              />
              <br />
              <input
                className="bg-gray-50"
                type="text"
                value={userInfo.address.line2}
                onChange={(e) =>
                  setUserInfo((prev) => ({
                    ...prev,
                    address: { ...prev, line2: e.target.value },
                  }))
                }
              />
            </p>
          ) : (
            <p className="text-gray-500">
              {userInfo.address.line1}
              <br />
              {userInfo.address.line2}
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEditMode ? (
            <select
              className="max-w-20 bg-gray-100"
              value={userInfo.gender}
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">{userInfo.gender}</p>
          )}
          <p className="font-medium">Date of birth:</p>
          {isEditMode ? (
            <input
              className="max-w-28 bg-gray-100"
              type="date"
              value={userInfo.dob}
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-400">{userInfo.dob}</p>
          )}
        </div>
      </div>
      <div className="mt-10">
        {isEditMode ? (
          <button
            className="border border-primary px-8 py-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all duration-400"
            onClick={() => setIsEditMode(false)}
          >
            Save Information
          </button>
        ) : (
          <button
            className="border border-primary px-8 py-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all duration-400"
            onClick={() => setIsEditMode(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
