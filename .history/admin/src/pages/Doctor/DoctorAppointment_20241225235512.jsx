import React, { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorAppointment = () => {
  const { dtoken, getAllAppointments } = useContext(DoctorContext);
  useEffect(() => {
    getAllAppointments();
  });
  return <div></div>;
};

export default DoctorAppointment;
