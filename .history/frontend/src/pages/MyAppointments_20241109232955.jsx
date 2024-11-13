import { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);

  const fetchDocInfo = useCallback(() => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);
  }, [doctors, docId]);

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId, fetchDocInfo]);

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId, fetchDocInfo]);

  return <div className="text-white p-6 bg-black min-h-screen"></div>;
};

export default MyAppointments;
