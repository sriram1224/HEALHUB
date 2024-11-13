import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { docId } = useParams();
  const { doctors } = useContext();

  return <div></div>;
};

export default MyAppointments;
