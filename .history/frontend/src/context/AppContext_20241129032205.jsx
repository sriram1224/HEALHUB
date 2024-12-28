import { createContext } from "react";
import PropTypes from "prop-types";
import { doctors, appointments } from "../assets/assets";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const value = {
    doctors,
    appointments,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppContextProvider;
