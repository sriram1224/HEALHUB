import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const navigate = useNavigate();
  const { backendurl, token, getDoctorsData } = useContext(AppContext);

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
  const initializeRazorpay = async (appointmentId) => {
    try {
      // Get order data from backend (order creation process)
      const { data } = await axios.post(
        `${backendurl}/api/user/payment-razorpay`,
        { appointmentId },
        { headers: { token } }
      );

      // If payment initialization fails, throw an error
      if (!data.success) {
        throw new Error(data.message || "Failed to initialize payment.");
      }

      // Razorpay options for payment window
      const options = {
        key: "rzp_test_HVzUoMU4jcFJUK", // Use your actual Razorpay key here
        amount: data.order.amount, // Amount in the smallest currency unit (paise)
        currency: data.order.currency,
        name: "Doctor Appointment",
        description: "Appointment Booking Payment",
        order_id: data.order.id, // Ensure this is the correct Razorpay order ID
        handler: async (response) => {
          try {
            const { data } = await axios.post(
              backendurl + "/api/user/verifyRazorpay",
              response,
              { headers: { token } }
            );
            if (data.success) {
              toast.success(data.message);
              getUsersAppointment();
              navigate("/my-appointment");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            toast.error(error.message || "Payment verification failed.");
          }
        },

        theme: {
          color: "#3399cc", // Customize the theme color
        },
      };

      // Open Razorpay payment window
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error initializing Razorpay:", error);
      toast.error(error.message || "Payment initialization failed.");
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
        getUsersAppointment();
        getDoctorsData();
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
        <h1 className="text-6xl bg-gradient-to-b from-[#333653] via-[#9b674b]  to-[#27293B] bg-clip-text text-transparent font-bold">
          My Appointments
        </h1>

        {appointments.length > 0 ? (
          <div className="flex flex-col gap-6">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="flex justify-between items-center border border-[#8e3a21] rounded-lg shadow-lg  transition-all duration-300 p-6"
              >
                {/* Left Section: Image and Details */}
                <div className="flex items-center gap-6">
                  {/* Doctor's Image */}
                  <img
                    src={appointment.docData?.image}

                    className="w-32 h-32 rounded-lg object-cover border-2 border-gray-700 shadow-lg"
                  />

                  {/* Card Content */}
                  <div>
                    <p className="text-3xl font-bold text-[#421984] mb-2">
                      {appointment.docData?.name || "Unknown"}
                    </p>
                    <p className="text-gray-900 flex flex-row gap-3 text-xl mb-2">
                      <strong>Speciality:</strong>{" "}
                      <p className="text-[#8f6a21] font-bold">{appointment.docData?.speciality || "N/A"}</p>
                    </p>

                    <p className=" flex flex-row gap-3 text-xl mb-1">
                      <strong className="text-gray-800">Date:</strong>{" "}
                      <p className="text-red-700">{appointment.slotDate
                        ? new Date(appointment.slotDate).toLocaleDateString()
                        : "N/A"}</p>
                    </p>
                    <p className="text-white flex flex-row gap-3 text-xl">
                      <strong className="text-gray-800">Time:</strong>{" "}
                      <p className="text-red-800">{appointment.slotTime || "N/A"}</p>
                    </p>
                  </div>
                </div>

                {/* Right Section: Buttons */}
                <div className="flex flex-col gap-4">
                  {appointment.isCompleted ? (
                    // If appointment is completed, show "Completed" button and hide other buttons
                    <button
                      className="px-6 py-2 text-lg font-semibold text-white-400 bg-green-500 rounded-lg cursor-not-allowed"
                      disabled
                    >
                      Completed
                    </button>
                  ) : appointment.payment ? (
                    // If payment is done, show "Paid" button and disable other buttons

                    <button
                      className="px-6 py-2 text-lg font-semibold text-white bg-green-500 rounded-lg cursor-not-allowed"
                      disabled
                    >
                      Paid
                    </button>
                  ) : appointment.cancelled ? (
                    // If appointment is cancelled, show "Cancelled" button and hide other buttons
                    <button
                      className="px-6 py-2 text-lg font-semibold text-red-800  rounded-lg cursor-not-allowed"
                      disabled
                    >
                      Cancelled
                    </button>
                  ) : (
                    // If neither, show the normal buttons
                    <>
                      <button
                        onClick={() => {
                          initializeRazorpay(appointment._id);
                        }}
                        className="px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
                      >
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
