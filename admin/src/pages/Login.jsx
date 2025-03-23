import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [role, setRole] = useState("Admin");
  const [form, setForm] = useState({});
  const { setAdminToken, backendURL } = useContext(AdminContext);

  const handleFieldChanged = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (role === "Admin") {
        const { data } = await axios.post(backendURL + "/admin/login", form);
        if (data.success) {
          localStorage.setItem("adminToken", data.token);
          setAdminToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
      }
    } catch (error) {}
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="m-auto text-2xl font-semibold">
          <span className="text-primary">{role}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => handleFieldChanged("email", e.target.value)}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => handleFieldChanged("password", e.target.value)}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer hover:bg-blue-500">
          Login
        </button>
        {role === "Admin" ? (
          <p>
            Login as Doctor?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setRole("Doctor")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Login as Admin?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setRole("Admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
