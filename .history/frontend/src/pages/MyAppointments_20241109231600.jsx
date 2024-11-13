import { useContext } from "react";
import { useParams } from "react-router-dom";

const MyAppointments = () => {
  const { docId } = useParams();
  const { doctors } = useContext();
  return <div></div>;
};

export default MyAppointments;
