import React, { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { dashData, cancelAppointment } = useContext(AdminContext);

  // Function to format date and time
  const formatDateTime = (date) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate)
      ? "Invalid Date"
      : parsedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  return (
    dashData && <div className="p-4  min-h-screen">{/* Dashboard Stats */}</div>
  );
};

export default Dashboard;
