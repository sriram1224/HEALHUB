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
              className="flex items-center bg-gray-800 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover"
              />
              <div className="p-4 flex-1">
                <h2 className="text-xl font-semibold text-white">
                  {item.name}
                </h2>
                <p className="text-gray-400">{item.speciality}</p>
                <p className="text-gray-400 mt-2">
                  {JSON.parse(item.address).line1},{" "}
                  {JSON.parse(item.address).line2}
                </p>
                <div className="flex items-center mt-4 space-x-2">
                  <input
                    type="checkbox"
                    checked={item.available}
                    className="form-checkbox h-5 w-5 text-blue-600"
                    readOnly
                  />
                  <span className="text-gray-300">
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
