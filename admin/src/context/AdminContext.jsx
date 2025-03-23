import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextContextProvider = ({ children }) => {
  // Below value, we can access from any components

  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") ?? ""
  );
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const value = {
    adminToken,
    setAdminToken,
    backendURL,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextContextProvider;
