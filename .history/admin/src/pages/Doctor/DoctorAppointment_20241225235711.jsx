import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorAppointment = () => {
  const { dtoken, getAllAppointments } = useContext(DoctorContext);
  useEffect(() => {
    if (dtoken) {
      getAllAppointments();
    }
  }, [dtoken]);
  return <div></div>;
};

export default DoctorAppointment;
