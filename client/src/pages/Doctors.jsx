import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import DoctorCard from "../components/DoctorCard";
import { specialtyData } from "../assets/assets";

const Doctors = () => {
  const { specialty } = useParams();
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (specialty) {
      setFilteredDoctors(doctors.filter((i) => i.specialty === specialty));
      return;
    } else {
      setFilteredDoctors(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, specialty]);

  return (
    <div className="mt-6">
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Categories */}
        <div className="flex flex-col gap-4 text-sm text-gray-600">
          {specialtyData.map((item) => (
            <p
              key={item.specialty}
              onClick={() => {
                specialty === item.specialty
                  ? navigate("/doctors")
                  : navigate(`/doctors/${item.specialty}`);
              }}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                specialty === item.specialty ? "bg-indigo-100 text-black" : ""
              }`}
            >
              {item.specialty}
            </p>
          ))}
        </div>
        {/* List doctors */}
        <div className="w-full grid grid-cols-auto xl:grid-cols-5 gap-4 gap-y-6">
          {filteredDoctors.map((doctor, index) => (
            <DoctorCard doctor={doctor} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
