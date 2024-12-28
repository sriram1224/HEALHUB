import { createContext } from "react";
import PropTypes from "prop-types";
import { doctors, appointments } from "../assets/assets";
import axios from "axios";
import { useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const value = {
    doctors,
    appointments,
  };
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/doctors/list");
      if (data.success) {
        setDoctors(data.doctors);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getDoctorsData();
  });

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppContextProvider;
