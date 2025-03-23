import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  // Below value, we can access from any components
  const value = {};

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
