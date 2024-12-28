import { AppContext } from "../context/AppContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const MyAppointments = () => {
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
            // Verify the payment after it is completed
            const verifyResponse = await axios.post(
              `${backendurl}/api/user/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { headers: { token } }
            );

            if (verifyResponse.data.success) {
              toast.success("Payment successful!");
              getUsersAppointment(); // Refresh the appointment list
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (error) {
            toast.error("Payment verification failed.");
            console.error("Error during verification:", error);
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
                <div className="flex flex-col gap-4">
                  {appointment.cancelled ? (
                    <button
                      className="px-6 py-2 text-lg font-semibold text-gray-400 bg-gray-700 rounded-lg cursor-not-allowed"
                      disabled
                    >
                      Cancelled
                    </button>
                  ) : (
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