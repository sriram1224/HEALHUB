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
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default AllApointments;
