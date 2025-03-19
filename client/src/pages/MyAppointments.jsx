import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b border-b-gray-300">
        My Appointments
      </p>
      <div>
        {doctors.slice(0, 3).map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-b-gray-300"
            key={index}
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item.image}
                alt="appointment_img"
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600 ">
              <p className="text-neutral-800 font-semibold">{item.name}</p>
              <p>{item.specialty}</p>
              <p className="text-zinc-700 font-medium mmt-1">Address</p>
              <p className="text-xs">{item.address.line1}</p>
              <p className="text-xs">{item.address.line2}</p>
              <p className="text-sm mt-1">
                <span className="text-sm font-medium text-neutral-700">
                  Date & Time:
                </span>
                25, July, 2025 | 8:30 PM
              </p>
            </div>
            {/* For grid layout */}
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300  cursor-pointer">
                Pay online
              </button>
              <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-600 cursor-pointer ">
                Cancel appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
