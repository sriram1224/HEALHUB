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
            {appointment && appointment.length > 0 ? (
              appointment.map((item, index) => (
                <tr key={item._id}>
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <img
                      src={item.userData.image}
                      alt=""
                      className="w-32 h-32 rounded-full object-cover"
                    />
                    {item.userData.name}
                  </td>
                  <td className="px-4 py-2 text-center">{item.userData.dob}</td>
                  <td className="px-4 py-2 text-center">{item.dateTime}</td>
                  <td className="px-4 py-2 text-center">{item.doctorName}</td>
                  <td className="px-4 py-2 text-center">{item.fees}</td>
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