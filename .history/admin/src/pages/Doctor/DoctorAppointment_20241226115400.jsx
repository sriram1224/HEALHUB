import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorAppointment = () => {
  const { dToken, getAllAppointments } = useContext(DoctorContext);
  useEffect(() => {
    if (dtoken) {
      getAllAppointments();
      console.log(dToken);
    }
  }, [dToken]);
  return <div>Doctor Appointments</div>;
};

export default DoctorAppointment;
