import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import DoctorsList from "./pages/Admin/DoctorsList";
import AddDoctor from "./pages/Admin/AddDoctor";

import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";

import { AdminContext } from "./context/AdminContext";
import { ThemeContext } from "./context/ThemeContext";
import { DoctorContext } from "./context/DoctorContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { atoken } = useContext(AdminContext);
  const { isDarkMode } = useContext(ThemeContext);
  const { dToken } = useContext(DoctorContext);

  const isAuthenticated = atoken || dToken;

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="flex flex-col h-screen bg-gray-100 dark:bg-black text-black dark:text-white transition-all">
        {isAuthenticated ? (
          <>
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <div className="flex-1 p-6 overflow-y-auto border-l-2 border-t-2 border-blue-600 rounded-lg bg-gray-100 dark:bg-gray-900">
                <Routes>
                  {/* Admin Routes */}
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/admin-dashboard" element={<Dashboard />} />
                  <Route
                    path="/all-appointments"
                    element={<AllAppointments />}
                  />
                  <Route path="/add-doctor" element={<AddDoctor />} />
                  <Route path="/doctor-list" element={<DoctorsList />} />

                  {/* Doctor Routes */}
                  <Route
                    path="/doctor-dashboard"
                    element={<DoctorDashboard />}
                  />
                  <Route
                    path="/doctor-appointment"
                    element={<DoctorAppointment />}
                  />
                  <Route path="/doctor-profile" element={<DoctorProfile />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <>
            <Login />
            <ToastContainer />
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
