import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const {
    dashData,
    getDashData,
    dToken,
    CancelAppointment,
    CompleteAppointment,
    currency,
  } = useContext(DoctorContext);

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

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  if (!dashData) {
    return <div>Loading...</div>;
  }

  return (
    dashData && (
      <div className="p-4 min-h-screen">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Doctors */}
          <div className="flex flex-col items-center p-4 bg-gray-800 text-white rounded-lg shadow hover:shadow-lg transition duration-300">
            <img
              src={assets.earning_icon}
              alt="Doctor Icon"
              className="w-14 h-14 mb-2"
            />
            <h2 className="text-3xl font-bold text-blue-400">
              ${dashData.earning}
            </h2>
            <p className="text-gray-300 font-medium">earnings</p>
          </div>

          {/* Appointments */}
          <div className="flex flex-col items-center p-4 bg-gray-800 text-white rounded-lg shadow hover:shadow-lg transition duration-300">
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
          <div className="flex flex-col items-center p-4 bg-gray-800 text-white rounded-lg shadow hover:shadow-lg transition duration-300">
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
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <div className="flex items-center mb-4">
            <img
              src={assets.list_icon}
              alt="List Icon"
              className="w-8 h-8 mr-2"
            />
            <h2 className="text-2xl font-bold text-gray-100">
              Latest Appointments
            </h2>
          </div>

          <div className="space-y-4">
            {(dashData.latestAppointments?.length > 0
              ? dashData.latestAppointments
              : []
            ).map((item, index) => (
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

                {/* Cancel/Complete Button */}
                <div>
                  {item.isCompleted ? (
                    // ✅ Completed State
                    <div className="flex items-center justify-center gap-2 text-green-500">
                      <span className="material-icons text-xl">
                        check_circle
                      </span>
                      <span className="font-medium">Appointment Completed</span>
                    </div>
                  ) : item.cancelled ? (
                    // 🛑 Cancelled State
                    <div className="flex items-center justify-center gap-2 text-red-500">
                      <span className="material-icons text-xl">cancel</span>
                      <span className="font-medium">Cancelled</span>
                    </div>
                  ) : (
                    // 🟡 Pending State (Show both buttons)
                    <div className="flex items-center justify-center gap-4">
                      {/* Confirm Button */}
                      <button
                        onClick={() => CompleteAppointment(item._id)}
                        className="flex items-center gap-1 text-green-500 hover:text-green-600 transition"
                        title="Confirm Appointment"
                      >
                        <span className="material-icons text-xl">
                          check_circle
                        </span>
                        <span className="hidden sm:inline font-medium">
                          Confirm
                        </span>
                      </button>
                      {/* Cancel Button */}
                      <button
                        onClick={() => CancelAppointment(item._id)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-600 transition"
                        title="Cancel Appointment"
                      >
                        <span className="material-icons text-xl">cancel</span>
                        <span className="hidden sm:inline font-medium">
                          Cancel
                        </span>
                      </button>
                    </div>
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

export default DoctorDashboard;
