import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

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

export default Appointments;
