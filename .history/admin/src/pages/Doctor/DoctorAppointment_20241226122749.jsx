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
      <p>All Appointments</p>
      <div>
        {" "}
        <div>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => {})}
      </div>
    </div>
  );
};

export default DoctorAppointment;
