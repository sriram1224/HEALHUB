import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const Dashboard = () => {
  const { atoken, dashData, getDashData, cancelAppointment } =
    useContext(AdminContext);

  console.log("Dashboard Data:", dashData);
  useEffect(() => {
    if (atoken) {
      getDashData();
    }
  }, [atoken]);
  return <div></div>;
};

export default Dashboard;
