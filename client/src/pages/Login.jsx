import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(false);
  const { backendURL, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  // Form: email, pass, name
  const [form, setForm] = useState({});

  const onFieldChanged = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendURL + `/user/${isLoginForm ? 'login' : 'register'}`,
        form
      );
      if (data.success) {
        toast.success(
          isLoginForm ? 'Logged in successfully' : 'Registered successfully'
        );
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        toast.error(isLoginForm ? 'Failed to l ogin' : 'Failed to register');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg ">
        <p className="text-2xl font-semibold">
          {isLoginForm ? 'Login' : 'Create Account'}
        </p>
        <p>Please {isLoginForm ? 'login' : 'signup'} to book appointment</p>
        {!isLoginForm && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => onFieldChanged('name', e.target.value)}
              value={form.name}
              required
            />
          </div>
        )}
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => onFieldChanged('email', e.target.value)}
            value={form.email}
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => onFieldChanged('password', e.target.value)}
            value={form.password}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          {isLoginForm ? 'Login' : 'Create Account'}
        </button>
        {isLoginForm ? (
          <p>
            Create a new account?
            <span
              onClick={() => setIsLoginForm(false)}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span
              onClick={() => setIsLoginForm(true)}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
