import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { use } from "react";

const DoctorDashboard = () => {
  const { dashData, getDashData, dToken, setDashData } =
    useContext(DoctorContext);
  console.log(dashData);
  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div>
        <div>p</div>
      </div>
    )
  );
};

export default DoctorDashboard;
