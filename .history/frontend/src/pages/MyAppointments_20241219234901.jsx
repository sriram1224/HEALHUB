import { AppContext } from "../context/AppContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const MyAppointments = () => {
  const { backendurl, token } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const getUsersAppointment = async () => {
    try {
      const { data } = await axios.get(
        backendurl + "/api/user/my-appointments",
        {
          headers: { token },
        }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (token) {
      getUsersAppointment();
    }
  }, [token]);

  const cancelAppointment = async (appointmentId) => {
    try {
      console.log("Sending data:", { appointmentId });

      // Make sure userId is available and pass it along with appointmentId
      const { data } = await axios.post(
        backendurl + "/api/user/cancel-appointment",
        { appointmentId }, // Correctly send data in the body
        { headers: { token } } // Ensure token is passed in headers
      );

      if (data.success) {
        toast.success(data.message);
        getUsersAppointment(); // Refresh the appointments
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-6 min-h-screen text-white">
      <div>
        <h1 className="text-4xl font-bold mb-8 text-center md:text-left text-white">
          My Appointments
        </h1>

        {appointments.length > 0 ? (
          <div className="flex flex-col gap-6">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="flex justify-between items-center bg-gray-800 rounded-lg shadow-lg hover:bg-gray-900 transition-all duration-300 p-6"
              >
                {/* Left Section: Image and Details */}
                <div className="flex items-center gap-6">
                  {/* Doctor's Image */}
                  <img
                    src={appointment.docData?.image}
                    alt={`Dr. ${appointment.docData?.name}`}
                    className="w-32 h-32 rounded-lg object-cover border-2 border-gray-700 shadow-lg"
                  />

                  {/* Card Content */}
                  <div>
                    <p className="text-2xl font-semibold text-white mb-2">
                      Dr. {appointment.docData?.name || "Unknown"}
                    </p>
                    <p className="text-gray-400 mb-2">
                      <strong>Speciality:</strong>{" "}
                      {appointment.docData?.speciality || "N/A"}
                    </p>
                    <p className="text-white mb-1">
                      <strong className="text-gray-400">Patient Name:</strong>{" "}
                      {appointment.patientName || "N/A"}
                    </p>
                    <p className="text-white mb-1">
                      <strong className="text-gray-400">Date:</strong>{" "}
                      {appointment.slotDate
                        ? new Date(appointment.slotDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p className="text-white">
                      <strong className="text-gray-400">Time:</strong>{" "}
                      {appointment.slotTime || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Right Section: Buttons */}
                <div className="flex gap-4">
                  {appointment.cancelled ? (
                    <button
                      className="px-6 py-2 text-lg font-semibold text-gray-400 bg-gray-700 rounded-lg cursor-not-allowed"
                      disabled
                    >
                      Cancelled
                    </button>
                  ) : (
                    <>
                      <button className="px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200">
                        Pay Online
                      </button>
                      <button
                        onClick={() => cancelAppointment(appointment._id)}
                        className="px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
                      >
                        Cancel Appointment
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-lg mt-12">
            No appointments found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
