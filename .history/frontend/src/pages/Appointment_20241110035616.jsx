import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const getAvailableSlots = async () => {
    setDocSlot([]);
    const today = new Date();
    const slotsPerDay = [];
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() + i);
      currentDate.setHours(10, 0, 0, 0);
      const daySlots = [];
      for (let j = 0; j < 22; j++) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        daySlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      slotsPerDay.push(daySlots);
    }
    setDocSlot(slotsPerDay);
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
      {/* Slots */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Booking Slots</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {docSlot.length &&
            docSlot.map((items, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
                <p className="text-blue-400 font-bold">
                  {items[0] && daysOfWeek[items[0].dateTime.getDay()]}
                </p>
                <p className="text-gray-400">
                  {items[0] && items[0].dateTime.getDate()}
                </p>
                <div className="mt-2">
                  {items.map((item, idx) => (
                    <p
                      key={idx}
                      className="text-gray-300 text-sm bg-gray-700 p-2 rounded-lg mb-1"
                    >
                      {item.time.toLowerCase()}
                    </p>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
