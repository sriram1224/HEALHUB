import { createContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
export const DoctorContext = createContext();
const DoctorContextProvider = (props) => {
  const backendurl = import.meta.env.VITE_APP_BACKEND_URL;

  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
  const [appointments, setAppointments] = useState([]);
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendurl}/api/doctors/appointments`,
        {
          headers: {
            dtoken: dToken, // Ensure this matches the backend expectation
          },
        }
      );
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments.reverse());
      } else {
        toast.error("Error while fetching appointments");
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error in getAllAppointments:", error.message);
      toast.error("Failed to fetch appointments");
    }
  };

  const value = {
    dToken,
    setDToken,
    backendurl,
    appointments,
    setAppointments,
    getAllAppointments,
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
