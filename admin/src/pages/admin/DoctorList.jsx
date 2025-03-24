import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import DoctorCard from '../../components/DoctorCard';

const DoctorList = () => {
  const { doctors, adminToken, getAllDoctors } = useContext(AdminContext);

  useEffect(() => {
    if (adminToken) {
      getAllDoctors();
    }
  }, []);
  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg ">All Doctors</h1>
      <div className="grid grid-cols-auto gap-4 w-full pt-5 gap-y-6">
        {doctors.map((doc, index) => (
          <DoctorCard key={index} doctor={doc} isAdmin />
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
