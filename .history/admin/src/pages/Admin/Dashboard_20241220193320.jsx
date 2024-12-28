import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const Dashboard = () => {
  const { atoken, dashData, getDashData, cancelAppointment } =
    useContext(AdminContext);
  console.log("Dashboard Data:", dashData); // Debug log
  return <div></div>;
};

export default Dashboard;
