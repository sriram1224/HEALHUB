import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Appointments = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  useEffect(() => {
    if (doctors && doctors.length > 0) {
      const docInfo = doctors.find((doc) => doc._id === docId);
      setDocInfo(docInfo);
      console.log(docInfo);
    }
  }, [doctors, docId]);
  const getAvailableSlots = async () => {
    setDocSlot([]);
    //getting current date
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() + i);
      //setting end time of the date
      let endTime = new Date();
      endTime.setDate(today.getDate() + 1);
      endTime.setHours(21, 0, 0, 0);
      //setting hours
      if(today.getDate() === currentDate.getDate()){
        currentDate.setHours(today.getHours()>10 ? currentDate.getHours()+1: 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
        
      }
  };
  useEffect(() => {
    getAvailableSlots();
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
    </div>
  );
};

export default Appointments;
