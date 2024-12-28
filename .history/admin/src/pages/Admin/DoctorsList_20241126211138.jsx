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
      <h1 className="text-3xl font-semibold text-white mb-8">All Doctors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(doctor) &&
          doctor.map((item, index) => (
            <div key={index} className="bg-gray-800 py-14 rounded-lg shadow-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32  mx-auto mb-4"
              />
              <div className="text-center">
                <p className="text-xl font-semibold text-white">{item.name}</p>
                <p className="text-gray-400">{item.speciality}</p>
                <p className="text-gray-400">
                  {JSON.parse(item.address).line1},
                  {JSON.parse(item.address).line2}
                </p>
                <div className="flex items-center justify-center mt-4">
                  <input
                    type="checkbox"
                    checked={item.available}
                    className="form-checkbox h-5 w-5 text-blue-600"
                    readOnly
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
