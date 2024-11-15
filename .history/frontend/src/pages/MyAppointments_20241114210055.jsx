import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const MyAppointments = () => {
  const { appointments } = useContext(AppContext);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">My Appointments</h1>
      {appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.appointmentId}
              className="p-4 bg-gray-800 rounded-lg shadow-md"
            >
              <img
                src={appointment.image}
                alt={`Dr. ${appointment.doctorId}`}
                className="w-16 h-16 rounded-full mr-4"
              />
              <p>
                <strong>Doctor ID:</strong> {appointment.doctorId}
              </p>
              <p>
                <strong>Patient Name:</strong> {appointment.patientName}
              </p>
              <p>
                <strong>Appointment Date:</strong> {appointment.appointmentDate}
              </p>
              <p>
                <strong>Appointment Time:</strong> {appointment.appointmentTime}
              </p>
              <p>
                <strong>Status:</strong> {appointment.status}
              </p>
              <p>
                <strong>Notes:</strong> {appointment.notes}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default MyAppointments;
