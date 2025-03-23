import { createContext } from "react";

export const DoctorContext = createContext();

const DoctorContextContextProvider = ({ children }) => {
  // Below value, we can access from any components
  const value = {};

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContextContextProvider;
