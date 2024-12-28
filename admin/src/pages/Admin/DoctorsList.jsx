import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const {
    doctor = [],
    atoken,
    getAllDoctors,
    changeAvailability,
  } = useContext(AdminContext);

  // Fetch doctors when the token is available
  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

  // Handle availability toggle
  const handleAvailabilityChange = (docId) => {
    changeAvailability(docId);
  };

  return (
    <div className="min-h-screen bg-transparent p-8">
      <h1 className="text-3xl font-semibold text-white mb-8 text-center">
        All Doctors
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(doctor) &&
          doctor.map((item, index) => {
            // Ensure address is properly parsed if it's a JSON string
            const address =
              typeof item.address === "string"
                ? JSON.parse(item.address)
                : item.address;

            return (
              <div
                key={index}
                className="max-w-sm  rounded-lg border border-[#421984] p-2   hover:shadow-inner transition duration-300"
              >
                {/* Doctor's Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 border-2  bg-gradient-to-r from-yellow-300 to-orange-400 border-orange-600 rounded-full mx-auto mb-4"
                />

                {/* Doctor Details */}
                <div className="text-center p-4">
                  <p className="text-xl font-semibold text-[#421984]">
                    {item.name}
                  </p>
                  <p className="text-gray-800">{item.speciality}</p>
                  <p className="text-gray-700">
                    {address?.line1}, {address?.line2}
                  </p>

                  {/* Availability Toggle */}
                  <div className="flex items-center justify-center mt-4">
                    <input
                      type="checkbox"
                      checked={item.available}
                      onChange={() => handleAvailabilityChange(item._id)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <p className={`text-${item.available ? "green" : "red"}-500 font-bold mx-3`}>
                      {item.available ? "Available" : "Not Available"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DoctorsList;
