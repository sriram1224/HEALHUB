import React, { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { dashData, cancelAppointment } = useContext(AdminContext);

  // Function to format date and time
  const formatDateTime = (date) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate)
      ? "Invalid Date"
      : parsedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  return (
    dashData && (
      <div className="p-4  min-h-screen">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Doctors */}
          <div className="flex flex-col items-center p-4 border border-blue-400 text-white rounded-lg shadow hover:shadow-lg transition duration-300">
            <img
              src={assets.doctor_icon}
              alt="Doctor Icon"
              className="w-14 h-14 mb-2"
            />
            <h2 className="text-3xl font-bold text-blue-400">
              {dashData.doctors}
            </h2>
            <p className="text-gray-300 font-medium">Doctors</p>
          </div>

          {/* Appointments */}
          <div className="flex flex-col items-center p-4 border border-blue-400 text-white rounded-lg shadow hover:shadow-lg transition duration-300">
            <img
              src={assets.appointments_icon}
              alt="Appointments Icon"
              className="w-14 h-14 mb-2"
            />
            <h2 className="text-3xl font-bold text-blue-400">
              {dashData.appointments}
            </h2>
            <p className="text-gray-300 font-medium">Appointments</p>
          </div>

          {/* Patients */}
          <div className="flex flex-col items-center p-4 border border-blue-400 text-white rounded-lg shadow hover:shadow-lg transition duration-300">
            <img
              src={assets.patients_icon}
              alt="Patients Icon"
              className="w-14 h-14 mb-2"
            />
            <h2 className="text-3xl font-bold text-blue-400">
              {dashData.patients}
            </h2>
            <p className="text-gray-300 font-medium">Patients</p>
          </div>
        </div>

        {/* Latest Appointments */}
        <div className=" text-[#6523a7] p-6 border border-blue-400 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <div className="flex items-center mb-4">
            <img
              src={assets.list_icon}
              alt="List Icon"
              className="w-8 h-8 mr-2"
            />
            <h2 className="text-2xl font-bold ">Latest Appointments</h2>
          </div>

          <div className="space-y-4">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 border-b border-gray-700 rounded-md hover:bg-gray-700 transition duration-200"
              >
                {/* Doctor Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={item.docData.image}
                    alt="Doctor"
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-600"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-200">
                      {item.docData.name}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {formatDateTime(item.slotDate)}
                    </p>
                  </div>
                </div>

                {/* Cancel Button */}
                <div>
                  {item.cancelled ? (
                    <button
                      disabled
                      className="px-4 py-2 bg-gray-600 text-gray-400 rounded cursor-not-allowed"
                    >
                      Cancelled
                    </button>
                  ) : (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                    >
                      <img
                        src={assets.cancel_icon}
                        alt="Cancel"
                        className="w-5 h-5 mr-2"
                      />
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
