import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userDetails, setUserDetails, token, backendURL, getUserDetails } =
    useContext(AppContext);
  console.log('userDetails: ', userDetails);
  const [isEditMode, setIsEditMode] = useState(false);
  const [image, setImage] = useState(undefined);
  console.log('image: ', image);
  const updateUserProfile = async () => {
    try {
      const formData = new FormData();

      formData.append('name', userDetails.name);
      formData.append('phone', userDetails.phone);
      formData.append('address', JSON.stringify(userDetails.address));
      formData.append('gender', userDetails.gender);
      formData.append('dob', userDetails.dob);
      image && formData.append('image', image);

      const { data } = await axios.patch(
        backendURL + '/user/update-profile',
        formData,
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        await getUserDetails();
        setIsEditMode(false);
        setImage(undefined);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    Object.keys(userDetails).length > 0 && (
      <div className="max-w-lg flex flex-col gap-2 text-sm">
        {isEditMode ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userDetails.image}
                alt=""
              />
              <img
                className="w-10 absolute bottom-12 right-12"
                src={image ? '' : assets.upload_icon}
                alt=""
              />
            </div>
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img
            className="w-36 rounded"
            src={userDetails.image}
            alt="user_image"
          />
        )}

        {isEditMode ? (
          <input
            className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
            type="text"
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, name: e.target.value }))
            }
            value={userDetails.name}
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {userDetails.name}
          </p>
        )}
        <hr className="bg-zinc-400 h-[1px] border-none" />
        <div>
          <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Email id:</p>
            <p className="text-blue-400">{userDetails.email}</p>
            <p className="font-medium">Phone:</p>
            {isEditMode ? (
              <input
                className="bg-gray-100 max-w-52"
                type="text"
                value={userDetails.phone}
                onChange={(e) =>
                  setUserDetails((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue-400">{userDetails.phone}</p>
            )}
            <p className="font-medium">Address:</p>
            {isEditMode ? (
              <p>
                <input
                  className="bg-gray-50"
                  type="text"
                  value={userDetails.address.line1}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      address: { ...prev, line1: e.target.value },
                    }))
                  }
                />
                <br />
                <input
                  className="bg-gray-50"
                  type="text"
                  value={userDetails.address.line2}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      address: { ...prev, line2: e.target.value },
                    }))
                  }
                />
              </p>
            ) : (
              <p className="text-gray-500">
                {userDetails.address.line1}
                <br />
                {userDetails.address.line2}
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
                value={userDetails.gender}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    gender: e.target.value,
                  }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-400">{userDetails.gender}</p>
            )}
            <p className="font-medium">Date of birth:</p>
            {isEditMode ? (
              <input
                className="max-w-28 bg-gray-100"
                type="date"
                value={userDetails.dob}
                onChange={(e) =>
                  setUserDetails((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-400">{userDetails.dob}</p>
            )}
          </div>
        </div>
        <div className="mt-10">
          {isEditMode ? (
            <button
              className="border border-primary px-8 py-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all duration-400"
              onClick={updateUserProfile}
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
    )
  );
};

export default MyProfile;
