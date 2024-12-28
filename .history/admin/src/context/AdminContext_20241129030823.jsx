import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [atoken, setAtoken] = useState(localStorage.getItem("atoken") || "");
  const [doctor, setDoctor] = useState([]);
  const backendurl = process.env.REACT_APP_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendurl + "/api/admin/all-doctor",
        {},
        { headers: { atoken } }
      );
      if (data.success) {
        setDoctor(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendurl + "/api/admin/change-availability",
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

  const value = {
    atoken,
    doctor,
    getAllDoctors,
    changeAvailability,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminProvider;
