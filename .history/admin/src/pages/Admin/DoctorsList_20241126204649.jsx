import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets"; // Ensure assets is a named export

const DoctorsList = () => {
  const { doctors = [], atoken, getAllDoctors } = useContext(AdminContext); // Initialize doctors to an empty array
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
            <img src={assets[item.image]} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.speciality}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
