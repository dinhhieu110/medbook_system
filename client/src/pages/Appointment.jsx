import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const { doctorId } = useParams();
  const { doctors, currency } = useContext(AppContext);
  const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [doctorInfo, setDocInfo] = useState(null);
  const [doctorSlots, setDoctorSlots] = useState([]);
  console.log("doctorSlots[0]: ", doctorSlots[0]);
  const [slotIndex, setSlotIndex] = useState(1);
  const [slotTime, setSlotTime] = useState("");

  const fetchDoctorInfo = async () => {
    const doctor = doctors.find((doc) => doc._id === doctorId);
    setDocInfo(doctor);
  };

  let today = new Date();
  console.log("get date: ", today.getDate());
  console.log("get day: ", today.getDay());

  const getAvailableSlots = async () => {
    setDoctorSlots([]);

    let today = new Date();
    console.log("today: ", today);

    for (let i = 0; i < 7; i++) {
      // Get date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Set end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0); // 9:00 pm

      // Set hours - If current time is 11:00 am, so we just need to show from 12:00 pm
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        // Future dates
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      // Create a slot every 30m
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // Add slot to array
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });

        // Increment current type by 30m
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDoctorSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDoctorInfo();
  }, [doctorId, doctors]);

  useEffect(() => {
    getAvailableSlots();
  }, [doctorInfo]);

  useEffect(() => {
    console.log("docSlots:", doctorSlots);
  }, [doctorSlots]);

  return (
    doctorInfo && (
      <div>
        {/* Doctor Info */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Avatar */}
          <div className="">
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={doctorInfo.image}
              alt="doctor_image"
            />
          </div>
          {/* Name, degree, exp */}
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 sm:mt-0 mt-[-80px]">
            <p
              className="flex items-center gap-2 text-2xl font-medium
             text-gray-900"
            >
              {doctorInfo.name}{" "}
              <img
                className="w-5"
                src={assets.verified_icon}
                alt="checkmark_icon"
              />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {doctorInfo.degree} - {doctorInfo.specialty}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {doctorInfo.experience}
              </button>
            </div>
            {/* about */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="info_icon" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {doctorInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appoint fee:
              <span className="text-gray-600">
                {currency}
                {doctorInfo.fees}
              </span>
            </p>
          </div>
        </div>
        {/* Booking slots */}
        <div className="ml-0 sm:ml-20 lg:ml-72 sm:pl-4 mt-4 font-medium  text-gray-700">
          <p>Booking slots</p>
          <div className="flex flex-wrap gap-3 items-center w-full overflow-x-scroll mt-4">
            {doctorSlots.length &&
              doctorSlots.map(
                // 1 slot is 1 day that contains time ranges of that day
                (slot, index) =>
                  slot[0] && (
                    <div
                      onClick={() => setSlotIndex(index)}
                      className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                        slotIndex === index
                          ? "bg-primary text-white"
                          : "border border-gray-200"
                      }`}
                      key={index}
                    >
                      <p>{dayOfWeek[slot[0].dateTime.getDay()]}</p>
                      <p>{slot[0].dateTime.getDate()}</p>
                    </div>
                  )
              )}
          </div>
          <div className="flex items-center gap-2 w-full overflow-x-scroll mt-4">
            {doctorSlots.length &&
              doctorSlots[slotIndex].map((timeRange, index) => (
                <p
                  onClick={() => setSlotTime(timeRange.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    timeRange.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                  key={index}
                >
                  {timeRange.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button className="bg-primary text-white text-sm font-light p-3 rounded-full px-14 my-6">
            Book an appointment
          </button>
        </div>
        {/* Related Doctors */}
        <RelatedDoctors doctorInfo={doctorInfo} />
      </div>
    )
  );
};

export default Appointment;
