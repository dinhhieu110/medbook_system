import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    experience: '1 Year',
    specialty: 'General physician',
    fees: '',
    degree: '',
    address1: '',
    address2: '',
    about: '',
    image: null,
  };
  const [form, setForm] = useState(initialState);
  const { adminToken, backendURL } = useContext(AdminContext);

  const handleFieldChanged = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!form.image) {
        return toast.error('Please upload avatar');
      }
      const formData = new FormData();
      Object.keys(form).map((key) => {
        if (key !== 'address1' && key !== 'address2') {
          formData.append(key, key === 'fees' ? Number(form[key]) : form[key]);
        }
      });
      formData.append(
        'address',
        JSON.stringify({ line1: form.address1, line2: form.address2 })
      );
      const { data } = await axios.post(
        backendURL + '/admin/add-doctor',
        formData,
        { headers: { adminToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setForm(initialState);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll ">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doctor-img">
            <img
              className="w-16 h-16 bg-gray-100 rounded-full cursor-pointer object-cover"
              src={
                form.image
                  ? URL.createObjectURL(form.image)
                  : assets.upload_area
              }
              alt="avatar"
            />
          </label>
          <input
            onChange={(e) => handleFieldChanged('image', e.target.files[0])}
            type="file"
            id="doctor-img"
            hidden
          />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          {/* Left form */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name</p>
              <input
                value={form.name}
                onChange={(e) => handleFieldChanged('name', e.target.value)}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <p>Doctor Email</p>
              <input
                value={form.email}
                onChange={(e) => handleFieldChanged('email', e.target.value)}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <p>Doctor Password</p>
              <input
                value={form.password}
                onChange={(e) => handleFieldChanged('password', e.target.value)}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="********"
                required
              />
            </div>
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <p>Experience</p>
              <select
                onChange={(e) =>
                  handleFieldChanged('experience', e.target.value)
                }
                value={form.experience}
                className="border rounded px-3 py-2"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
                <option value="8 Years">8 Years</option>
                <option value="9 Years">9 Years</option>
                <option value="10 Years">10 Years</option>
              </select>
            </div>
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <p>Doctor Fees</p>
              <input
                value={form.fees}
                onChange={(e) => handleFieldChanged('fees', e.target.value)}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Your fees"
                required
              />
            </div>
          </div>
          {/* Right form */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <p>Specialty</p>
              <select
                onChange={(e) =>
                  handleFieldChanged('specialty', e.target.value)
                }
                value={form.specialty}
                className="border rounded px-3 py-2"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <p>Education</p>
              <input
                value={form.degree}
                onChange={(e) => handleFieldChanged('degree', e.target.value)}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Education"
                required
              />
            </div>
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <p>Address</p>
              <input
                value={form.address1}
                onChange={(e) => handleFieldChanged('address1', e.target.value)}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Address 1"
                required
              />
              <input
                value={form.address2}
                onChange={(e) => handleFieldChanged('address2', e.target.value)}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Address 2"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            value={form.about}
            onChange={(e) => handleFieldChanged('about', e.target.value)}
            className="border rounded px-4 pt-2 w-full"
            type="text"
            placeholder="Write about doctor"
            rows={5}
            required
          />
        </div>
        <button className="bg-primary text-white py-3 mt-4 px-10 rounded-full hover:bg-blue-400 cursor-pointer">
          Add doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
