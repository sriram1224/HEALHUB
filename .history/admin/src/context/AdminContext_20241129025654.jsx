/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();
const AdminContextProvider = (props) => {
  const [atoken, setAtoken] = useState(localStorage.getItem("atoken") || "");
  const [doctor, setDoctor] = useState({});
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/admin/all-doctor`,
        {},
        {
          headers: { atoken },
        }
      );
      if (data.success) {
        setDoctor(data.doctors);
      } else {
        toast(data.message, { type: "error" });
      }
    } catch (err) {
      toast.error(error.message);
    }
  };
  const changeAvalability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendurl + "/api/admin/change-availability",
        { docId },
        { headers: { atoken } }
      );
    } catch (err) {
      toast.error(err.message);
    }
  };
  const value = {
    atoken,
    setAtoken,
    backendurl,
    doctor,
    getAllDoctors,
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
