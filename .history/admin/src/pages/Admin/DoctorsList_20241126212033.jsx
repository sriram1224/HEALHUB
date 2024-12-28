import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctor = [], atoken, getAllDoctors } = useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-3xl font-semibold text-white mb-8 text-center">
        All Doctors
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(doctor) &&
          doctor.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="py-8 flex flex-col items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-56 p-2  rounded-full border-4 hover:bg-blue-500 shadow-lg mb-6"
                />
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-white">
                    {item.name}
                  </h2>
                  <p className="text-gray-400">{item.speciality}</p>
                  <p className="text-gray-400 mt-2">
                    {JSON.parse(item.address).line1},{" "}
                    {JSON.parse(item.address).line2}
                  </p>
                </div>
              </div>
              <div className="bg-gray-700 py-4 rounded-b-lg text-center">
                <div className="flex justify-center items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={item.available}
                    className="form-checkbox h-6 w-6 text-blue-600"
                    readOnly
                  />
                  <span className="text-gray-300 font-medium">
                    {item.available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DoctorsList;
