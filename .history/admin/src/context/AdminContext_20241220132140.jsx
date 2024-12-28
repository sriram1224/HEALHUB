/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();
const AdminContextProvider = (props) => {
  const [atoken, setAtoken] = useState(localStorage.getItem("atoken") || "");
  const [doctor, setDoctor] = useState([]);
  const [appointment, setAppointment] = useState({});
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
  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/admin/change-availability`,
        { docId },
        { headers: { atoken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendurl + "/api/admin/appointment-admin",
        { headers: { atoken } }
      );
      if (data.success) {
        setAppointment(data.appointments);
        console.log(appointment);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const value = {
    atoken,
    setAtoken,
    backendurl,
    doctor,
    getAllDoctors,
    changeAvailability,
    appointment,
    setAppointment,
    getAllAppointments,
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
