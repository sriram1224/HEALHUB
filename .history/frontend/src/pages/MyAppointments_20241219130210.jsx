import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const MyAppointments = () => {
  const { backendurl, token } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  return (
    <div className="p-6 min-h-screen text-white ">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center md:text-left text-white">
          My Appointments
        </h1>

        {appointments.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {appointments.map((appointment) => (
              <div
                key={appointment.appointmentId}
                className="p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-900 transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={appointment.image}
                    alt={`Dr. ${appointment.doctorId}`}
                    className="w-20 h-20 rounded-full mr-4 shadow-lg bg-blue-600 border-2 border-gray-700"
                  />
                  <div>
                    <p className="text-2xl font-semibold text-white">
                      Dr. {appointment.doctorId}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {appointment.specialization}
                    </p>
                  </div>
                </div>

                <p className="text-white mb-2">
                  <strong className="text-gray-400">Patient Name:</strong>
                  {appointment.patientName}
                </p>
                <p className="text-white mb-2">
                  <strong className="text-gray-400">Date:</strong>
                  {appointment.appointmentDate}
                </p>
                <p className="text-white mb-4">
                  <strong className="text-gray-400">Time:</strong>
                  {appointment.appointmentTime}
                </p>

                <div className="flex flex-col gap-4">
                  <button className="px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200">
                    Pay Online
                  </button>
                  <button className="px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200">
                    Cancel Appointment
                  </button>
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
