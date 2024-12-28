/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AdminContext = createContext();
const AdminContextProvider = (props) => {
  const [atoken, setAtoken] = useState(localStorage.getItem("atoken") || "");
  const [doctor, setDoctor] = useState({});
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const getAllDoctors = async () => {
    try {
      const {data} = 
    }
    catch (err) {
      console.error(err.message);
    }
  };
  const value = {
    atoken,
    setAtoken,
    backendurl,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

AdminContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AdminContextProvider };
export default AdminContextProvider;
