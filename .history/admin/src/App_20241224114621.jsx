import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Admin/Dashboard";
import AllApointments from "./pages/Admin/AllApointments";
import DoctorsList from "./pages/Admin/DoctorsList";
import { AdminContext } from "./context/AdminContext";
import { ThemeContext } from "./context/ThemeContext";
import AddDoctor from "./pages/Admin/AddDoctor";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DoctorContext } from "./context/DoctorContext";
const App = () => {
  const { atoken } = useContext(AdminContext);
  const { isDarkMode } = useContext(ThemeContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      {" "}
      <div className="flex flex-col h-screen bg-gray-100 dark:bg-black text-black dark:text-white transition-all">
        {atoken || dToken ? (
          <div>
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
              <Sidebar />

              <div className="flex-1 p-6 overflow-y-auto border-l-2 border-t-2 border-blue-600 rounded-lg bg-gray-100 dark:bg-gray-900">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/admin-dashboard" element={<Dashboard />} />
                  <Route
                    path="/all-appointments"
                    element={<AllApointments />}
                  />
                  <Route path="/add-doctor" element={<AddDoctor />} />
                  <Route path="/doctor-list" element={<DoctorsList />} />
                </Routes>
              </div>
              <ToastContainer />
            </div>
          </div>
        ) : (
          <div>
            <Login />
            <ToastContainer />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
