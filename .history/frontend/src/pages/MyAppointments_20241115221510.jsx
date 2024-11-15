import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const MyAppointments = () => {
  const { appointments } = useContext(AppContext);

  return (
    <div className="p-6  min-h-screen text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center md:text-left">
          My Appointments
        </h1>

        {appointments.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {appointments.map((appointment) => (
              <div
                key={appointment.appointmentId}
                className="p-6 bg-gray-800 border-blue-400 hover:bg-black hover:border transition-transform duration-300 transform hover:-translate-y-2 rounded-lg"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={appointment.image}
                    alt={`Dr. ${appointment.doctorId}`}
                    className="w-16 h-16 rounded-full mr-4 shadow-md bg-blue-600 bg-opacity-50 border-2 border-gray-700"
                  />
                  <div>
                    <p className="text-xl font-semibold">
                      Dr. {appointment.doctorId}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {appointment.specialization}
                    </p>
                  </div>
                </div>

                <p>
                  <strong className="text-gray-400">Patient Name:</strong>{" "}
                  {appointment.patientName}
                </p>
                <p>
                  <strong className="text-gray-400">Date:</strong>{" "}
                  {appointment.appointmentDate}
                </p>
                <p>
                  <strong className="text-gray-400">Time:</strong>{" "}
                  {appointment.appointmentTime}
                </p>
                <div>
                  <button className="btn btn-primary">Pay Online</button>
                  <button className="btn btn-secondary">
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
