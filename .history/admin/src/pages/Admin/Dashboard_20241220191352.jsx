import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const Dashboard = () => {
  const { appointment, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  useEffect(() => { 
    if()
  }, []);
  return <div></div>;
};

export default Dashboard;
