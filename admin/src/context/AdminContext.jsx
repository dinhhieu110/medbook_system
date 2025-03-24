import { createContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextContextProvider = ({ children }) => {
  // Below value, we can access from any components

  const [adminToken, setAdminToken] = useState(
    localStorage.getItem('adminToken') ?? ''
  );
  const [doctors, setDoctors] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(backendURL + '/admin/all-doctors', {
        headers: { adminToken },
      });
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.patch(
        backendURL + '/admin/change-availability',
        { docId },
        {
          headers: { adminToken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    adminToken,
    setAdminToken,
    backendURL,
    doctors,
    getAllDoctors,
    changeAvailability,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextContextProvider;
