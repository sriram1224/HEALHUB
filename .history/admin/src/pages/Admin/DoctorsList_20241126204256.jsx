import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import assets from "../../assets/assets";

const DoctorsList = () => {
  const { doctors, atoken, getAllDoctors } = useContext(AdminContext);
  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);
  return (
    <div>
      <h1>All Doctors</h1>
      <div>
        {doctors.map((item, index) => (
          <div key={index}>
            <img src={assets} alt="" />
            <p>{doctors.name}</p>
            <p></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
