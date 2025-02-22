import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";

const AllApointments = () => {
  const { atoken, appointment, getAllAppointments } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (atoken) {
        await getAllAppointments();
      }
      setLoading(false);
    };
    fetchData();
  }, [atoken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Appointments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Patient</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Date & Time</th>
              <th className="px-4 py-2">Doctor</th>
              <th className="px-4 py-2">Fees</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <tr key={appointment._id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    {appointment.patientName}
                  </td>
                  <td className="border px-4 py-2">{appointment.age}</td>
                  <td className="border px-4 py-2">{appointment.dateTime}</td>
                  <td className="border px-4 py-2">{appointment.doctorName}</td>
                  <td className="border px-4 py-2">{appointment.fees}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
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

export default AllApointments;
