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
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
            >
              {/* Image at the top */}
              <a href="#">
                <img
                  className="rounded-t-lg w-full  object-cover"
                  src={item.image}
                  alt={item.name}
                />
              </a>
              {/* Content below the image */}
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.name}
                </h5>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                  {item.speciality}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-400 mt-2">
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
                  <span className="text-gray-500 dark:text-gray-300">
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
