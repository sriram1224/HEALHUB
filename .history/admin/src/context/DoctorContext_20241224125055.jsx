import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const DoctorContext = createContext();
const DoctorContextProvider = (props) => {
  const backendurl = import.meta.env.VITE_APP_BACKEND_URL;

  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
  const getAllAppointments = async () => {
    try {
      const response = await fetch(`${backendurl}/doctor/appointments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          dtoken: dToken,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    dToken,
    setDToken,
    backendurl,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

DoctorContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DoctorContextProvider };
export default DoctorContextProvider;
