import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className="lg:hidden p-3 bg-blue-500 text-white fixed top-4 left-4 z-50 rounded-md"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? "Close Menu" : "Open Menu"}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-gray-100 dark:bg-black text-black dark:text-white transition-transform z-40 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:w-60 lg:block border-r border-gray-300 dark:border-gray-700`}
      >
        <div className="p-6">
          {atoken && (
            <ul className="space-y-4">
              {/* Admin Dashboard */}
              <li>
                <NavLink
                  to="/admin-dashboard"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-700 hover:text-white"
                    }`
                  }
                >
                  <img
                    src={assets.home_icon}
                    alt="Dashboard"
                    className="w-6 h-6"
                  />
                  <span>Dashboard</span>
                </NavLink>
              </li>

              {/* All Appointments */}
              <li>
                <NavLink
                  to="/all-appointments"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-700 hover:text-white"
                    }`
                  }
                >
                  <img
                    src={assets.appointment_icon}
                    alt="Appointments"
                    className="w-6 h-6"
                  />
                  <span>Appointments</span>
                </NavLink>
              </li>

              {/* Add Doctor */}
              <li>
                <NavLink
                  to="/add-doctor"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-700 hover:text-white"
                    }`
                  }
                >
                  <img
                    src={assets.add_icon}
                    alt="Add Doctor"
                    className="w-6 h-6"
                  />
                  <span>Add Doctor</span>
                </NavLink>
              </li>
            </ul>
          )}
          {dToken && (
            <ul className="space-y-4">
              {/* Doctor Dashboard */}
              <li>
                <NavLink
                  to="/doctor-dashboard"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-700 hover:text-white"
                    }`
                  }
                >
                  <img
                    src={assets.home_icon}
                    alt="Dashboard"
                    className="w-6 h-6"
                  />
                  <span>Dashboard</span>
                </NavLink>
              </li>

              {/* Doctor Appointments */}
              <li>
                <NavLink
                  to="/doctor-appointment"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-700 hover:text-white"
                    }`
                  }
                >
                  <img
                    src={assets.appointment_icon}
                    alt="Appointments"
                    className="w-6 h-6"
                  />
                  <span>Appointments</span>
                </NavLink>
              </li>

              {/* Profile */}
              <li>
                <NavLink
                  to="/doctor-profile"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-700 hover:text-white"
                    }`
                  }
                >
                  <img
                    src={assets.people_icon}
                    alt="Profile"
                    className="w-6 h-6"
                  />
                  <span>Profile</span>
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </aside>

      {/* Backdrop for mobile view */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
