import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, backendurl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Function to fetch available slots
  const getAvailableSlots = async () => {
    if (!docInfo || !docInfo.slots_booked) return; // Ensure docInfo exists

    setDocSlot([]); // Clear existing slots
    const today = new Date();
    const slotsPerDay = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      if (i === 0 && today.getHours() < 20) {
        currentDate.setMinutes(
          currentDate.getMinutes() + (30 - (currentDate.getMinutes() % 30))
        );
        if (currentDate.getHours() >= 20 && currentDate.getMinutes() > 30)
          continue;
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      const daySlots = [];
      while (
        currentDate.getHours() < 20 ||
        (currentDate.getHours() === 20 && currentDate.getMinutes() <= 30)
      ) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        let date = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${year}-${month}-${date}`;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked?.[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          daySlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      slotsPerDay.push(daySlots);
    }
    setDocSlot(slotsPerDay);
  };

  // Function to book appointment
  const bookAppointment = async () => {
    if (!token) {
      toast.error("Please login to book an appointment");
      return navigate("/login");
    }

    try {
      const date = selectedSlot.dateTime;
      const formattedDate = moment(date).format("YYYY-MM-DD");
      const formattedTime = selectedSlot.time;

      const { data } = await axios.post(
        backendurl + "/api/user/book-appointment",
        {
          docId,
          slotDate: formattedDate,
          slotTime: formattedTime,
        },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/my-appointment");
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSlotSelection = (slot) => setSelectedSlot(slot);

  if (!docInfo) {
    return (
      <div className="text-white p-6 bg-black min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
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
          <p className="text-gray-400 text-sm mb-3">{docInfo.about}</p>
          <p className="text-white text-bold mb-3">
            Appointment Fees: ${docInfo.fees}
          </p>
        </div>
      </div>

      {/* Slots */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Booking Slots</h2>

        {/* Date Selection */}
        <div className="flex gap-4 overflow-x-auto">
          {docSlot.length > 0 &&
            docSlot.map((items, index) => (
              <div
                key={index}
                className={`cursor-pointer p-4 rounded-lg shadow-md ${
                  selectedDateIndex === index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-gray-400"
                }`}
                onClick={() => setSelectedDateIndex(index)}
              >
                <p className="font-bold">
                  {items[0] && daysOfWeek[items[0].dateTime.getDay()]}
                </p>
                <p>{items[0] && items[0].dateTime.getDate()}</p>
              </div>
            ))}
        </div>

        {/* Slot Time Selection */}
        <div className="mt-4 flex gap-2 overflow-x-auto">
          {docSlot[selectedDateIndex] &&
            docSlot[selectedDateIndex].map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleSlotSelection(item)}
                className={`text-gray-300 text-sm border border-gray-300 p-2 rounded-lg mb-1 cursor-pointer ${
                  selectedSlot === item ? "bg-blue-500 text-white" : ""
                }`}
              >
                {item.time}
              </div>
            ))}
        </div>

        {/* Selected Slot */}
        {selectedSlot && (
          <div className="mt-4 text-white">
            <h3 className="font-bold text-xl">Selected Slot:</h3>
            <p className="border border-gray-800 w-32">{selectedSlot.time}</p>
          </div>
        )}
        <button
          onClick={bookAppointment}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Book an Appointment
        </button>
      </div>

      {/* Related Doctors Section */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
