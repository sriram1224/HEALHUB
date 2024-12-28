import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const Dashboard = () => {
  const { atoken, dashData, getDashData, cancelAppointment } =
    useContext(AdminContext);
  useEffect(() => {
    if (atoken) {
      getDashData();
      console.log("Dashboard Data:", dashData);
    }
  }, [atoken]);
  return <div></div>;
};

export default Dashboard;
