import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorDashboard = () => {
  const { dashData, getDashData, dToken } = useContext(DoctorContext);
  return <div></div>;
};

export default DoctorDashboard;
