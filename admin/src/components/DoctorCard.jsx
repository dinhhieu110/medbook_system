import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

const DoctorCard = ({ key, doctor, isAdmin = false }) => {
  const { changeAvailability } = useContext(AdminContext);
  const navigate = useNavigate();
  return (
    <div
      key={key}
      className={`border border-blue-200 rounded-xl overflow-hidden cursor-pointer ${
        !isAdmin && 'hover:translate-y-[-10px] transition-all duration-500'
      } `}
      onClick={
        isAdmin
          ? () => undefined
          : () => {
              navigate(`/appointment/${doctor._id}`);
              scrollTo(0, 0);
            }
      }
    >
      <img
        className={`bg-blue-50 w-full ${isAdmin && 'hover:bg-primary'}`}
        src={doctor.image}
        alt="doctor_image"
      />
      <div className="p-4">
        {isAdmin ? (
          <div className="flex items-center gap-2 text-sm text-center">
            <input
              className="cursor-pointer"
              onChange={() => changeAvailability(doctor._id)}
              type="checkbox"
              checked={doctor.available}
            />
            <span>Available</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-center text-green-500">
            {doctor.available ? (
              <p className="flex items-center gap-2">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>Available
              </p>
            ) : (
              <p className="flex items-center gap-2">
                <p className="w-2 h-2 bg-gray-500 rounded-full"></p>Unavailable
              </p>
            )}
          </div>
        )}
        <p className="text-gray-900 text-lg font-medium">{doctor.name}</p>
        <p className="text-gray-600 text-sm">{doctor.specialty}</p>
      </div>
    </div>
  );
};

export default DoctorCard;
