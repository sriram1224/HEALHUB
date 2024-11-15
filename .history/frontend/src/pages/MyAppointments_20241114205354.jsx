import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const MyAppointments = () => {
  const { appointments } = useContext(AppContext);

  return <div></div>;
};

export default MyAppointments;
