import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorDashboard = () => {
  const { dashData, getDashData, dToken, setDashData } =
    useContext(DoctorContext);
  console.log(dashData);
  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return dashData && <div></div>;
};

export default DoctorDashboard;
