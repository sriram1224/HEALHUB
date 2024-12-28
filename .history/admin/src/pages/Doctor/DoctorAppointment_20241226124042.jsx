import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const DoctorAppointment = () => {
  const { dToken, getAllAppointments, appointments } =
    useContext(DoctorContext);
  const { calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAllAppointments();
      console.log(dToken);
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
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-3xl font-extrabold mb-6 text-center">
        Doctor Appointments
      </h2>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full table-auto bg-gray-800 text-sm rounded-lg">
          <thead className="bg-gray-700 text-gray-300 uppercase text-left">
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
              appointments.map((item, index) => {
                const { userData, docData, slotDate, payment } = item;

                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-700 transition duration-200"
                  >
                    {/* Serial Number */}
                    <td className="px-4 py-3 text-center">{index + 1}</td>

                    {/* Patient Info */}
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img
                        src={userData.image || "/default-user.png"}
                        alt="Patient"
                        className="w-10 h-10 rounded-full object-cover border border-gray-500"
                      />
                      <span className="font-medium">{userData.name}</span>
                    </td>

                    {/* Payment Status */}
                    <td
                      className={`px-4 py-3 text-center font-medium ${
                        payment ? "text-green-500" : "text-yellow-500"
                      }`}
                    >
                      {payment ? "Paid" : "Pending"}
                    </td>

                    {/* Age */}
                    <td className="px-4 py-3 text-center">
                      {calculateAge(userData.dob)}
                    </td>

                    {/* Date & Time */}
                    <td className="px-4 py-3 text-center">
                      {formatDateTime(slotDate)}
                    </td>

                    {/* Fees */}
                    <td className="px-4 py-3 text-center font-semibold">
                      ₹{docData.fees}
                    </td>

                    {/* Action Button */}
                    <td className="px-4 py-3 text-center">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                        View
                      </button>
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
