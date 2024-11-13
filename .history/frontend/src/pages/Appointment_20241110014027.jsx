import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Appointments = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);

  useEffect(() => {
    if (doctors && doctors.length > 0) {
      const docInfo = doctors.find((doc) => doc._id === docId);
      setDocInfo(docInfo);
      console.log(docInfo);
    }
  }, [doctors, docId]);

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
        <div className="w-full md:w-[80%] bg-gray-900 p-4 rounded-lg shadow-lg border border-white flex flex-col">
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
          <p className="text-gray-300 text-sm mb-3">{docInfo.about}</p>
          <p className="text-gray-400 text-sm mb-3">Fees: ${docInfo.fees}</p>
          <p className="text-gray-400 text-sm mb-3">
            Address: {docInfo.address.line1}, {docInfo.address.line2}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
