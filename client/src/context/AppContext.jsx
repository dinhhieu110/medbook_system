import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currency = '$';
  const [token, setToken] = useState(localStorage.getItem('token') ?? '');
  const [doctors, setDoctors] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [userDetails, setUserDetails] = useState({});

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(backendURL + '/doctor/list');
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const { data } = await axios.get(backendURL + '/user/get-profile', {
        headers: { token },
      });
      if (data.success) {
        console.log(data);
        setUserDetails(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Below value, we can access from any components
  const value = {
    doctors,
    currency,
    getAllDoctors,
    backendURL,
    token,
    setToken,
    getUserDetails,
    userDetails,
    setUserDetails,
  };

  useEffect(() => {
    getAllDoctors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Whenever user logged in
  useEffect(() => {
    if (token) {
      getUserDetails();
    } else {
      setUserDetails({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
