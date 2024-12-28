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
        <div className="grid grid-cols-1  md:grid-cols-3 gap-4 mb-8">
          {/* Doctors */}
          <div className="flex items-center bg-gray-800 p-4  rounded-lg shadow">
            <img
              src={assets.doctor_icon}
              alt="Doctor Icon"
              className="w-12 h-12 mr-4"
            />
            <div>
              <h2 className="text-2xl font-bold">{dashData.doctors}</h2>
              <p className="text-white">Doctors</p>
            </div>
          </div>

          {/* Appointments */}
          <div className="flex items-center bg-gray-800 p-4 rounded-lg shadow">
            <img
              src={assets.appointments_icon}
              alt="Appointments Icon"
              className="w-12 h-12 mr-4"
            />
            <div>
              <h2 className="text-2xl font-bold">{dashData.appointments}</h2>
              <p className="text-white">Appointments</p>
            </div>
          </div>

          {/* Patients */}
          <div className="flex items-center bg-gray-800 p-4  rounded-lg shadow">
            <img
              src={assets.patients_icon}
              alt="Patients Icon"
              className="w-12 h-12 mr-4"
            />
            <div>
              <h2 className="text-2xl font-bold">{dashData.patients}</h2>
              <p className="text-white">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Appointments */}
        <div className=" p-6 rounded-lg  bg-gray-700 shadow">
          <div className="flex items-center mb-4">
            <img
              src={assets.list_icon}
              alt="List Icon"
              className="w-8 h-8 mr-2"
            />
            <h2 className="text-xl font-bold">Latest Appointments</h2>
          </div>

          <div className="space-y-4 ">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4  rounded-lg"
              >
                {/* Doctor Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={item.docData.image}
                    alt="Doctor"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">
                      {item.docData.name}
                    </h4>
                    <p className="text-gray-500">
                      {formatDateTime(item.slotDate)}
                    </p>
                  </div>
                </div>

                {/* Cancel Button */}
                <div>
                  {item.cancelled ? (
                    <button
                      disabled
                      className="px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed"
                    >
                      Cancelled
                    </button>
                  ) : (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="px-4 py-2 border border-red-500 text-red-600 rounded hover:bg-red-600"
                    >
                      <img
                        src={assets.cancel_icon}
                        alt="Cancel"
                        className="w-6 h-6 inline-block mr-2"
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
