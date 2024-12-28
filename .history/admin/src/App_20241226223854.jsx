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
import { ToastContainer, toast } from "react-toastify";
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
      {" "}
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white transition-all">
        {atoken || dToken ? (
          <div>
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
              <Sidebar />

              <div className="flex-1 p-6 overflow-y-auto  border-blue-600 rounded-lg bg-gray-100 dark:bg-gray-900">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/admin-dashboard" element={<Dashboard />} />
                  <Route
                    path="/all-appointments"
                    element={<AllApointments />}
                  />
                  <Route path="/add-doctor" element={<AddDoctor />} />
                  <Route path="/doctor-list" element={<DoctorsList />} />
                  {/*Doctor Route*/}
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
          <div>
            <Login />
            <ToastContainer />
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
