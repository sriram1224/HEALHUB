import { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState();

  const fetchDocInfo = useCallback(() => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);
  }, [doctors, docId]);

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId, fetchDocInfo]);

  return (
    <div className="text-white p-6 bg-black min-h-screen">
      {docInfo ? (
        <div className="max-w-screen-md mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">{docInfo.name}</h1>
          <p className="text-xl mb-2">{docInfo.speciality}</p>
          <p className="text-gray-400 mb-4">{docInfo.degree}</p>
          <p className="text-gray-400 mb-4">
            {docInfo.experience} years of experience
          </p>
          <p className="text-gray-400 mb-4">{docInfo.about}</p>
          <p className="text-gray-400 mb-4">Fees: ${docInfo.fees}</p>
          <p className="text-gray-400 mb-4">
            Address: {docInfo.address.line1}, {docInfo.address.line2}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyAppointments;
