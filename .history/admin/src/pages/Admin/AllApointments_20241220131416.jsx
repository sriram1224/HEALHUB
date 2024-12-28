import React from "react";
import { AdminContext } from "../../context/AdminContext";
import { useContext } from "react";
import { useEffect } from "react";

const AllApointments = () => {
  const { atoken, appointments, getAllAppointments } = useContext(AdminContext);
  useEffect(() => {
    if (atoken) {
      getAllAppointments();
    }
  }, [atoken]);
  return (
    <div>
      <p>All Appointments</p>
      <div>
        <div>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & time</p>
          <p> Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments.map((item, index) => (
          <div key={item._id}>
            <p>{index + 1}</p>
            <div>
              <img src={item.userData.image} alt="" />
              <p>{item.userData.name}</p>
            </div>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllApointments;
