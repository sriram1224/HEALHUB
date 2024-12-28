import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const Dashboard = () => {
  const { atoken, dashData, getSDashData, cancelAppointment } =
    useContext(AdminContext);
  console.log(dashData);
  useEffect(() => {
    if (atoken) {
      getSDashData();
    }
  }, [atoken]);
  return <div></div>;
};

export default Dashboard;
