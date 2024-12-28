import React, { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorAppointment = () => {
  const { dtoken, getAllAppointments } = useContext(DoctorContext);
  useEffect(() => {
    getAllAppointments();
  }, [dtoken]);
  return <div></div>;
};

export default DoctorAppointment;
