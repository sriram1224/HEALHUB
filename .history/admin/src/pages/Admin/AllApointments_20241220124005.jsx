import React from "react";
import { AdminContext } from "../../context/AdminContext";
import { useContext } from "react";

const AllApointments = () => {
  const { atoken, appointments, getAllappoin } = useContext(AdminContext);
  return <div>AllApointments</div>;
};

export default AllApointments;
