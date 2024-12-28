import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, atoken, getAllDoctors } = useContext(AdminContext);
  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);
  return (
    <div>
      <h1>Doctors</h1>
    </div>
  );
};

export default DoctorsList;
