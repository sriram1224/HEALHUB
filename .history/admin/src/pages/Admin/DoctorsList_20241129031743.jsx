import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const {
    doctor = [],
    atoken,
    getAllDoctors,
    changeAvailability,
  } = useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

  const handleAvailabilityChange = (docId) => {
    changeAvailability(docId);
  };

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
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <div className="text-center p-4">
                <p className="text-xl font-semibold text-white">{item.name}</p>
                <p className="text-gray-400">{item.speciality}</p>
                <p className="text-gray-400">
                  {JSON.parse(item.address).line1},{" "}
                  {JSON.parse(item.address).line2}
                </p>
                <div className="flex items-center justify-center mt-4">
                  <input
                    type="checkbox"
                    checked={item.available}
                    onChange={() => handleAvailabilityChange(item._id)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-400">Available</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DoctorsList;
