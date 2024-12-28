import React, { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, atoken, getAllDoctors } = useContext(AdminContext);
  useEffect(() = {
    
  })
  return <div>DoctorList</div>;
};

export default DoctorsList;
