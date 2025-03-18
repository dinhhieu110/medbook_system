import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import DoctorCard from "./DoctorCard";

const RelatedDoctors = ({ doctorInfo }) => {
  const { doctors } = useContext(AppContext);
  const [relatedDoctors, setRelatedDoctors] = useState([]);

  useEffect(() => {
    if (doctors.length && doctorInfo) {
      const filteredDoctors = doctors.filter(
        (doctor) =>
          doctor.specialty === doctorInfo.specialty &&
          doctor._id !== doctorInfo._id
      );
      setRelatedDoctors(filteredDoctors);
    }
  }, [doctorInfo, doctors]);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-4xl font-medium">Related Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relatedDoctors.length &&
          relatedDoctors.map((item, index) => (
            <DoctorCard key={index} doctor={item} />
          ))}
      </div>
      <button
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 cursor-pointer"
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
      >
        more
      </button>
    </div>
  );
};

export default RelatedDoctors;
