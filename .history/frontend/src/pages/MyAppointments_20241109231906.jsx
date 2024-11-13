import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);

  const  [docInfo] 
  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
  };

  return <div></div>;
};

export default MyAppointments;
