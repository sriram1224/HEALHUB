import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorAppointment = () => {
  const { dtoken, getAllAppointments } = useContext(DoctorContext);
  useEffect(() => {
    if (dtoken) {
      getAllAppointments();
      console.log(dtoken);
    }
  }, [dtoken]);
  return <div>Doctor Appointments</div>;
};

export default DoctorAppointment;
