import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AdminContextContextProvider from "./context/AdminContext.jsx";
import DoctorContextContextProvider from "./context/DoctorContext.jsx";
import AppContextProvider from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextContextProvider>
      <DoctorContextContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </DoctorContextContextProvider>
    </AdminContextContextProvider>
  </BrowserRouter>
);
