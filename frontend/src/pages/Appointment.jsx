import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import { motion } from 'framer-motion';

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

      // Logic for today's slots
      if (i === 0) {
        const currentHour = today.getHours();
        const currentMinute = today.getMinutes();

        if (currentHour < 20) {
          // Start from the next available 30-minute slot
          currentDate.setHours(currentHour, currentMinute);
          currentDate.setMinutes(
            currentDate.getMinutes() + (30 - (currentMinute % 30))
          );
        } else {
          // If after 8 PM, skip today and move to tomorrow
          continue;
        }
      } else {
        // For subsequent days, start from 10:00 AM
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

        currentDate.setMinutes(
          currentDate.getMinutes() + (30 - (currentDate.getMinutes() % 30))
        );
      }

      if (daySlots.length > 0) {
        slotsPerDay.push(daySlots);
      }
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
      <div className="text-white p-6  min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }




  return (
    <div className="text-white p-6 min-h-screen">
      {/* Doctor's Information Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col md:flex-row items-stretch gap-6"
      >
        {/* Left - Doctor's Photo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="w-full md:w-1/3 bg-blue-100 rounded-lg shadow-lg overflow-hidden"
        >
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right - Doctor's Details */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full md:w-[100%] p-4 rounded-lg shadow-lg border border-white flex flex-col"
        >
          <h1 className="text-4xl font-bold mb-3 text-[#421984] flex items-center gap-4">
            {docInfo.name}
            <img
              src={assets.verified_icon}
              alt="Verified"
              className="w-5 h-5"
            />
          </h1>
          <div className="mb-6">
            <p className="text-3xl mb-2 font-bold text-[#3D52A0]">{docInfo.speciality}</p>
            <p className="text-[#7091E6] font-bold text-3xl mb-2">{docInfo.degree}</p>
            <p className="text-[#26791f] text-2xl font-bold mb-3">
              {docInfo.experience}'s of experience
            </p>
          </div>
          <p className="text-[#31416d] text-xl mb-3">{docInfo.about}</p>
          <p className="text-[#8e3a21] text-xl font-bold mb-3">
            Appointment Fees: ${docInfo.fees}
          </p>
        </motion.div>
      </motion.div>

      {/* Slots Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 text-[#421984]"
      >
        {docInfo.available ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Booking Slots</h2>

            {/* Date Selection */}
            <div className="flex gap-4 overflow-x-auto">
              {docSlot.length > 0 &&
                docSlot.map((items, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className={`cursor-pointer px-6 py-2 flex flex-col rounded-lg shadow-md ${selectedDateIndex === index
                      ? 'bg-blue-500 text-white'
                      : 'border border-[#421984] text-[#421984]'
                      }`}
                    onClick={() => setSelectedDateIndex(index)}
                  >
                    <p className="text-xl font-bold">
                      {items[0] && daysOfWeek[items[0].dateTime.getDay()]}-{items[0] && items[0].dateTime.getDate()}
                    </p>
                  </motion.div>
                ))}
            </div>

            {/* Slot Time Selection */}
            <div className="mt-4 flex gap-2 overflow-x-auto">
              {docSlot[selectedDateIndex] &&
                docSlot[selectedDateIndex].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSlotSelection(item)}
                    className={`text-xl border border-gray-300 p-2 rounded-lg mb-1 cursor-pointer ${selectedSlot === item
                      ? 'bg-blue-500 text-white'
                      : 'border-[#421984] text-[#421984]'
                      }`}
                  >
                    {item.time}
                  </motion.div>
                ))}
            </div>

            {/* Selected Slot */}
            {selectedSlot && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="mt-4 text-white"
              >
                <h3 className="font-bold text-[#421984] text-xl">Selected Slot:</h3>
                <p className="border border-[#421984] text-[#421984] text-xl font-bold w-32 rounded-lg px-5 py-2 text-center my-10">
                  {selectedSlot.time}
                </p>
              </motion.div>
            )}
          </div>
        ) : (
          <div>Slots Not available</div>
        )}

        {/* Book Appointment Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={bookAppointment}
          className={`bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 ${docInfo.available ? '' : 'cursor-not-allowed'
            }`}
        >
          Book an Appointment
        </motion.button>
      </motion.div>

      {/* Related Doctors Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </motion.div>
    </div>
  );
};


export default Appointment;
