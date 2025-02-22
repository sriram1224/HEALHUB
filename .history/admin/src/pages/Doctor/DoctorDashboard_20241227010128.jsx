import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { ThemeContext } from "../../context/ThemeContext";

const DoctorDashboard = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
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
      <div
        className={`p-4 min-h-screen bg-${
          theme === "dark" ? "gray-900" : ""
        } text-${theme === "dark" ? "white" : "black"}`}
      >
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Doctors */}
          <div
            className={`flex flex-col items-center p-4 bg-${
              theme === "dark" ? "gray-800" : ""
            } text-${
              theme === "dark" ? "white" : "black"
            } border-2 border-blue-300 rounded-lg shadow hover:shadow-lg transition duration-300`}
          >
            <img
              src={assets.earning_icon}
              alt="Doctor Icon"
              className="w-14 h-14 mb-2"
            />
            <h2 className="text-3xl font-bold text-blue-600">
              $ {dashData.earning}
            </h2>
            <p className=" font-medium">Earnings</p>
          </div>

          {/* Appointments */}
          <div
            className={`flex flex-col items-center p-4 bg-${
              theme === "dark" ? "gray-800" : ""
            } text-${
              theme === "dark" ? "white" : "black"
            } border-2 border-blue-300 rounded-lg shadow hover:shadow-lg transition duration-300`}
          >
            <img
              src={assets.appointments_icon}
              alt="Appointments Icon"
              className="w-14 h-14 mb-2"
            />
            <h2 className="text-3xl font-bold text-blue-600">
              {dashData.appointments}
            </h2>
            <p className=" font-medium">Appointments</p>
          </div>

          {/* Patients */}
          <div
            className={`flex flex-col items-center p-4 bg-${
              theme === "dark" ? "gray-800" : ""
            } text-${
              theme === "dark" ? "white" : "black"
            } border-2 border-blue-300 rounded-lg shadow hover:shadow-lg transition duration-300`}
          >
            <img
              src={assets.patients_icon}
              alt="Patients Icon"
              className="w-14 h-14 mb-2"
            />
            <h2 className="text-3xl font-bold text-blue-600">
              {dashData.patients}
            </h2>
            <p className=" font-medium">Patients</p>
          </div>
        </div>

        {/* Latest Appointments */}
        <div
          className={`bg-${theme === "dark" ? "gray-800" : ""} text-${
            theme === "dark" ? "white" : "black"
          } p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-2 border-blue-300`}
        >
          <div className="flex items-center mb-4">
            <span className="w-8 h-8" class="material-icons">
              ballot
            </span>
            <h2 className="text-2xl font-bold">Latest Appointments</h2>
          </div>

          <div className="space-y-4">
            {(dashData.latestAppointments?.length > 0
              ? dashData.latestAppointments
              : []
            ).map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-4 border-b ${
                  theme === "dark" ? "border-gray-700" : "border-gray-300"
                } rounded-md hover:shawdow-lg transition duration-200`}
              >
                {/* Doctor Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={item.userData.image}
                    alt="Doctor"
                    className={`w-14 h-14 rounded-full object-cover border-2 border-blue-500`}
                  />
                  <div>
                    <h4 className="text-lg font-semibold ">
                      {item.userData.name}
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
                      <span className="font-medium cursor-pointer">
                        Appointment Completed
                      </span>
                    </div>
                  ) : item.cancelled ? (
                    // 🛑 Cancelled State
                    <div className="flex items-center justify-center gap-2 text-red-500">
                      <span className="material-icons text-xl">cancel</span>
                      <span className="font-medium cursor-pointer">
                        Cancelled
                      </span>
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
