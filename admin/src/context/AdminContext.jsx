import { createContext } from "react";

export const AdminContext = createContext();

const AdminContextContextProvider = ({ children }) => {
  // Below value, we can access from any components
  const value = {};

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextContextProvider;
