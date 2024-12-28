import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { ThemeContext } from "../../context/ThemeContext";

const DoctorAppointment = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const {
    dToken,
    getAllAppointments,
    appointments,
    CompleteAppointment,
    CancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAllAppointments();
    }
  }, [dToken]);

  const formatDateTime = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div
      className={`p-6 min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      } text-${theme === "dark" ? "white" : "black"}`}
    >
      <h2
        className={`text-3xl font-extrabold mb-6 text-center ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        Doctor Appointments
      </h2>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table
          className={`w-full table-auto ${
            theme === "dark" ? "bg-gray-800 text-sm" : "bg-gray-100 text-sm"
          } rounded-lg`}
        >
          <thead
            className={`text-${
              theme === "dark" ? "gray-300" : "gray-700"
            } uppercase text-left`}
          >
            <tr>
              <th className="px-4 py-3 text-center">#</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3 text-center">Payment</th>
              <th className="px-4 py-3 text-center">Age</th>
              <th className="px-4 py-3 text-center">Date & Time</th>
              <th className="px-4 py-3 text-center">Fees</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length > 0 ? (
              appointments.reverse().map((item, index) => {
                const { userData, docData, slotDate, payment } = item;

                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-200 transition duration-200"
                  >
                    <td className="px-4 py-3 text-center">{index + 1}</td>
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img
                        src={userData.image || "/default-user.png"}
                        alt="Patient"
                        className="w-10 h-10 rounded-full object-cover border border-gray-500"
                      />
                      <span className="font-medium">{userData.name}</span>
                    </td>
                    <td
                      className={`px-4 py-3 text-center font-medium ${
                        payment ? "text-green-500" : "text-yellow-500"
                      }`}
                    >
                      {payment ? "Paid" : "Pending"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {calculateAge(userData.dob)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {formatDateTime(slotDate)}
                    </td>
                    <td className="px-4 py-3 text-center font-semibold">
                      ₹{docData.fees}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {item.isCompleted ? (
                        <div className="flex items-center justify-center gap-2 text-green-500">
                          <span className="material-icons text-xl">
                            check_circle
                          </span>
                          <span className="font-medium">
                            Appointment Completed
                          </span>
                        </div>
                      ) : item.cancelled ? (
                        <div className="flex items-center justify-center gap-2 text-red-500">
                          <span className="material-icons text-xl">cancel</span>
                          <span className="font-medium">Cancelled</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-4">
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
                          <button
                            onClick={() => CancelAppointment(item._id)}
                            className="flex items-center gap-1 text-red-500 hover:text-red-600 transition"
                            title="Cancel Appointment"
                          >
                            <span className="material-icons text-xl">
                              cancel
                            </span>
                            <span className="hidden sm:inline font-medium">
                              Cancel
                            </span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-400 font-medium"
                >
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAppointment;
