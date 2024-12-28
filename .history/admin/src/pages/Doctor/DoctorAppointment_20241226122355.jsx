import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorAppointment = () => {
  const { dToken, getAllAppointments } = useContext(DoctorContext);
  useEffect(() => {
    if (dToken) {
      getAllAppointments();
      console.log(dToken);
    }
  }, [dToken]);
  return (
    <div>
      <div>
        <p>#</p>
        <p>Patient</p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default DoctorAppointment;
