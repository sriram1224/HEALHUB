import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { use } from "react";

const DoctorDashboard = () => {
  const { dashData, getDashData, dToken, setDashData } =
    useContext(DoctorContext);
  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, []);
  return (
    <div>
      <div>p</div>
    </div>
  );
};

export default DoctorDashboard;
