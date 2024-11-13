import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Appointments = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);

  useEffect(() => {
    console.log("Doctors array:", doctors);
    console.log("Doctor ID:", docId);

    // Check if doctors array is populated
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    console.log("Fetched doctor info:", docInfo); // Should print docInfo object if found
  }, [doctors, docId]);

  return (
    <div>{docInfo ? JSON.stringify(docInfo) : "Loading doctor info..."}</div>
  );
};

export default Appointments;
