import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currency = '$';
  const [doctors, setDoctors] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(backendURL + '/doctor/list');
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  // Below value, we can access from any components
  const value = {
    doctors,
    currency,
    getAllDoctors,
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
