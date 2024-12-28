import React, { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

const Dashboard = () => {
  const { appointment, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  return <div></div>;
};

export default Dashboard;
