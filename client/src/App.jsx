import { Route, Routes } from "react-router-dom";
import {
  About,
  Appointment,
  Contact,
  Doctors,
  Home,
  Login,
  MyAppointments,
  MyProfile,
} from "./pages";
import { Footer, Header } from "./components";

function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/appointment/:doctorId" element={<Appointment />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
