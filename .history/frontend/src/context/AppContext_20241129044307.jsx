import { createContext } from "react";
import PropTypes from "prop-types";
import { doctors, appointments } from "../assets/assets";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState("");

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/doctors/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };
  useEffect(() => {
    getDoctorsData();
  }, []);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppContextProvider;
