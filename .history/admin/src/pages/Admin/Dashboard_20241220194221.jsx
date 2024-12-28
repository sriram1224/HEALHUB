import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const Dashboard = () => {
  const { atoken, dashData, getDashData, cancelAppointment } =
    useContext(AdminContext);
  useEffect(() => {
    if (atoken) {
      getDashData();
    }
  }, [atoken]);
  console.log("Dashboard Data:", dashData);
  return <div></div>;
};

export default Dashboard;
