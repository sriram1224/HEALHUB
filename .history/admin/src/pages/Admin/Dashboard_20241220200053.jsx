import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { atoken, dashData, getDashData, cancelAppointment } =
    useContext(AdminContext);

  console.log("Dashboard Data:", dashData);
  return (
    dashData && (
      <div>
        <div>
          <div>
            <img src={assets.} alt="" />
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
