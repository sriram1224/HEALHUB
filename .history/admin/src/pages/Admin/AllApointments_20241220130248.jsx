import React from "react";
import { AdminContext } from "../../context/AdminContext";
import { useContext } from "react";
import { useEffect } from "react";

const AllApointments = () => {
  const { atoken, appointments, getAllAppointments } = useContext(AdminContext);
  useEffect(() => {
    getAllAppointments();
  });
  return <div>AllApointments</div>;
};

export default AllApointments;
