import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { atoken, dashData, getDashData, cancelAppointment } =
    useContext(AdminContext);
  const formatDateTime = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  console.log("Dashboard Data:", dashData);
  return (
    dashData && (
      <div>
        <div>
          <div>
            <div>
              <img src={assets.doctor_icon} alt="" />
            </div>
            <div>
              <h2>{dashData.doctors}</h2>
              <p></p>
              <p>Doctors</p>
            </div>
          </div>
          <div>
            <div>
              <img src={assets.appointments_icon} alt="" />
            </div>
            <div>
              <h2>{dashData.appointments}</h2>
              <p>Doctors</p>
            </div>
          </div>
          <div>
            <div>
              <img src={assets.patients_icon} alt="" />
            </div>
            <div>
              <h2>{dashData.patients}</h2>
              <p>Doctors</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <img src={assets.list_icon} alt="" />
            <h2>Latest Appointments</h2>
            <div>
              {dashData.latestAppointments.map((item, index) => (
                <div key={index}>
                  <div>
                    <img src={item.userData.image} alt="" />
                    <h4>{item.userData.name}</h4>
                    <p>{formatDateTime(item.userData.slotDate)}</p>
                  </div>
                  <div>
                    <img
                      src={assets.cancel_icon}
                      alt=""
                      onClick={() => cancelAppointment(appointment._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
