import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const getAvailableSlots = async () => {
    setDocSlot([]);
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() + i);
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          today.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlot((prevSlots) => [...prevSlots, ...timeSlots]);
    }
  };

  useEffect(() => {
    if (doctors && doctors.length > 0) {
      const docInfo = doctors.find((doc) => doc._id === docId);
      setDocInfo(docInfo);
      console.log("Doctor Info:", docInfo);
    } else {
      console.log("Doctors array is empty or not loaded yet.");
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!docInfo) {
    return (
      <div className="text-white p-6 bg-black min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="text-white p-6 bg-black min-h-screen">
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Left - Doctor's Photo */}
        <div className="w-full md:w-1/3 bg-blue-100 p-4 rounded-lg shadow-lg">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-full h-auto rounded-lg"
          />
        </div>
        {/* Right - Doctor's Details */}
        <div className="w-full md:w-2/3 bg-gray-900 p-6 rounded-lg shadow-lg border border-white">
          <h1 className="text-3xl font-bold mb-4 text-blue-400">
            {docInfo.name}
          </h1>
          <p className="text-xl mb-2">{docInfo.speciality}</p>
          <p className="text-gray-300 mb-2">{docInfo.degree}</p>
          <p className="text-gray-400 mb-4">
            {docInfo.experience} years of experience
          </p>
          <p className="text-gray-300 mb-4">{docInfo.about}</p>
          <p className="text-gray-400 mb-4">Fees: ${docInfo.fees}</p>
          <p className="text-gray-400 mb-4">
            Address: {docInfo.address.line1}, {docInfo.address.line2}
          </p>
          <button
            onClick={() => alert("Booking an appointment...")}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Book an Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
