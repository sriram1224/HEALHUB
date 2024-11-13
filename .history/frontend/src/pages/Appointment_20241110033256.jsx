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
    setDocSlot([]); // Clear docSlot at the beginning
    const today = new Date();
    const slotsPerDay = []; // Array to hold all days' slots as nested arrays

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() + i);
      currentDate.setHours(10, 0, 0, 0); // Start time at 10:00 AM for each day

      const daySlots = []; // Array to hold slots for a single day

      for (let j = 0; j < 22; j++) {
        // Generate exactly 22 slots
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        daySlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30); // Increment by 30 minutes
      }

      slotsPerDay.push(daySlots); // Push the day's slots array to slotsPerDay
    }

    setDocSlot(slotsPerDay); // Set docSlot as an array of arrays
  };

  useEffect(() => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);
  useEffect(() => {
    console.log(docSlot);
  }, [docSlot]);

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
    docInfo && (
      <div className="text-white p-6 bg-black min-h-screen">
        <div className="flex flex-col md:flex-row items-stretch gap-6">
          {/* Left - Doctor's Photo */}
          <div className="w-full md:w-1/3 bg-blue-100 rounded-lg shadow-lg overflow-hidden">
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right - Doctor's Details */}
          <div className="w-full md:w-[100%] bg-gray-900 p-4 rounded-lg shadow-lg border border-white flex flex-col">
            <h1 className="text-2xl font-bold mb-3 text-blue-400 flex flex-row gap-4">
              {docInfo.name}
              <img
                src={assets.verified_icon}
                alt="Verified"
                className="w-5 h-5"
              />
            </h1>
            <p className="text-lg mb-2">{docInfo.speciality}</p>
            <p className="text-gray-300 text-sm mb-2">{docInfo.degree}</p>
            <p className="text-gray-400 text-sm mb-3">
              {docInfo.experience} years of experience
            </p>
            <div className="flex items-center space-x-1 text-xs">
              <span>About</span>
              <span className="material-symbols-outlined">info</span>
            </div>
            <p className="text-gray-400 text-sm mb-3">{docInfo.about}</p>

            <p className="text-white text-bold mb-3">
              Appointment Fees: ${docInfo.fees}
            </p>
          </div>
        </div>
        {/* Slots */}
        <div>
          <p>Booking slots</p>
          <div>
            {docSlot.length &&
              docSlot.map((items, index) => (
                <div key={index}>
                  <p></p>
                  <p></p>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Appointment;
