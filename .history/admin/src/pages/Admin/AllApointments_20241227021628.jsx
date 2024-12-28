import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const { atoken, appointment, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, currency } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (atoken) {
        await getAllAppointments();
      }
      setLoading(false);
    };
    fetchData();
  }, [atoken, getAllAppointments]);

  const formatDateTime = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) {
    return <div className="text-center text-lg font-medium">Loading...</div>;
  }

  return (
    <div className="p-6  min-h-screen text-[#2c50d1]">
      <h2 className="text-3xl font-extrabold mb-6 text-center">
        All Appointments
      </h2>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full table-auto  text-sm rounded-lg">
          <thead className="bg-gray-700 text-gray-300 uppercase text-left">
            <tr>
              <th className="px-4 py-3 text-center">#</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3 text-center">Age</th>
              <th className="px-4 py-3 text-center">Date & Time</th>
              <th className="px-4 py-3">Doctor</th>
              <th className="px-4 py-3 text-center">Fees</th>
            </tr>
          </thead>
          <tbody>
            {appointment && appointment.length > 0 ? (
              appointment.map((item, index) => {
                const { userData, docData, slotDate } = item;

                return (
                  <tr
                    key={item._id}
                    className=" hover:bg-[#b6c2f5]  text-[#6523a7] transition duration-200"
                  >
                    {/* Serial Number */}
                    <td className="px-4 py-10 text-center">{index + 1}</td>

                    {/* Patient Info */}
                    <td className="px-4 py-10 flex items-center gap-3">
                      <img
                        src={userData.image || "/default-user.png"}
                        alt="Patient"
                        className="w-12 h-12 rounded-full object-cover border border-yellow-600"
                      />
                      <span className="font-medium">{userData.name}</span>
                    </td>

                    {/* Age */}
                    <td className="px-4 py-3 text-center">
                      {calculateAge(userData.dob)}
                    </td>

                    {/* Date & Time */}
                    <td className="px-4 py-3 text-center">
                      {formatDateTime(slotDate)}
                    </td>

                    {/* Doctor Info */}
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img
                        src={docData.image}
                        alt="Doctor"
                        className="w-10 h-10 rounded-full object-cover bg-gradient-to-r from-yellow-300 to-orange-400 border border-orange-600"
                      />
                      <span className="font-medium">{docData.name}</span>
                    </td>

                    {/* Fees */}
                    <td className=" py-3 text-center font-semibold">
                      {item.isCompleted ? (
                        <div className="text-green-500 border border-green-500  py-1 rounded">
                          Appointment Completed
                        </div>
                      ) : item.cancelled ? (
                        <p className="text-red-500 border border-red-500  py-1 font-normal rounded">
                          Appointment Cancelled
                        </p>
                      ) : (
                        <div className="flex items-center justify-center gap-10 ">
                          <span className="font-normal rounded-lg">
                            {currency}
                            {docData.fees}
                          </span>
                          <button
                            onClick={() => cancelAppointment(item._id)}
                            className="px-2 py-1 border-red-500 border text-red-500 rounded-lg"
                          >
                            Cancel
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
                  colSpan="6"
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

export default AllAppointments;