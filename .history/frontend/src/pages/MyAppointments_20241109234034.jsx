import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);

  useEffect(() => {
    if (doctors && doctors.length > 0) {
      // Check if doctors array is populated
      const docInfo = doctors.filter((doc) => doc._id === docId);
      setDocInfo(docInfo);
      console.log(docInfo); // Should print docInfo object if found
    }
  }, [doctors, docId]);

  return (
    <div>{docInfo ? JSON.stringify(docInfo) : "Loading doctor info..."}</div>
  );
};

export default MyAppointments;
