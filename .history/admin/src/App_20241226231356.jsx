import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Admin/Dashboard";
import AllApointments from "./pages/Admin/AllApointments";
import Login from "./pages/Login";
import DoctorsList from "./pages/Admin/DoctorsList";
import { AdminContext } from "./context/AdminContext";
import { ThemeContext } from "./context/ThemeContext";
import AddDoctor from "./pages/Admin/AddDoctor";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

const App = () => {
  const { atoken } = useContext(AdminContext);
  const { isDarkMode } = useContext(ThemeContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      {/* Main container with dynamic background color */}
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-all">
        {/* Check if the user is logged in as Admin or Doctor */}
        {atoken || dToken ? (
          <div>
            {/* Navbar Component */}
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar Component */}
              <Sidebar />

              <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-800 rounded-lg">
                {/* Routes for different pages */}
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/admin-dashboard" element={<Dashboard />} />
                  <Route
                    path="/all-appointments"
                    element={<AllApointments />}
                  />
                  <Route path="/add-doctor" element={<AddDoctor />} />
                  <Route path="/doctor-list" element={<DoctorsList />} />
                  {/* Doctor Routes */}
                  <Route
                    path="doctor-dashboard"
                    element={<DoctorDashboard />}
                  />
                  <Route
                    path="doctor-appointment"
                    element={<DoctorAppointment />}
                  />
                  <Route path="doctor-profile" element={<DoctorProfile />} />
                </Routes>
              </div>
            </div>
          </div>
        ) : (
          // If not logged in, show the login page
          <div>
            <Login />
          </div>
        )}

        {/* Toast notifications */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;
