import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const MyAppointments = () => {
  const { appointments } = useContext(AppContext);
  console.log(appointments);
  return <div></div>;
};

export default MyAppointments;
