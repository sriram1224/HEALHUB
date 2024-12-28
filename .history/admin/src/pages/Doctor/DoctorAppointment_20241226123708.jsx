import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorAppointment = () => {
  const { dToken, getAllAppointments, appointments } =
    useContext(DoctorContext);
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
        {appointments.map((item, index) => (
          <div key={index}>
            <img src={item.userData.image} alt="" />
            <p>{index + 1}</p>

            <p>{item.userData.name}</p>
            <p>{item.payment ? "paid" : "Pending"}</p>
            <p>{item.userData.age}</p>
            <p>{new Date(item.slotDate).toLocaleString()}</p>
            <p>{item.docData.fees}</p>
            <button>View</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
