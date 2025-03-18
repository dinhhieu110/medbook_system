import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ key, doctor }) => {
  const navigate = useNavigate();
  return (
    <div
      key={key}
      className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
      onClick={() => {
        navigate(`/appointment/${doctor._id}`);
        scrollTo(0, 0);
      }}
    >
      <img
        className="bg-blue-50 w-full"
        src={doctor.image}
        alt="doctor_image"
      />
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-center text-green-500">
          <p className="flex items-center gap-2">
            <p className="w-2 h-2 bg-green-500 rounded-full"></p>Available
          </p>
        </div>
        <p className="text-gray-900 text-lg font-medium">{doctor.name}</p>
        <p className="text-gray-600 text-sm">{doctor.specialty}</p>
      </div>
    </div>
  );
};

export default DoctorCard;
