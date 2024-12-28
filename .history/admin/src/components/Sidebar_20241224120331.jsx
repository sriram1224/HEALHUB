import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  return (
    <aside className="h-full p-6 w-60 bg-gray-100 dark:bg-black text-black dark:text-white transition-all border-r border-gray-300 dark:border-gray-700">
      {atoken && (
        <ul className="space-y-4">
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
              <img src={assets.home_icon} alt="Dashboard" className="w-6 h-6" />
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
              <img src={assets.add_icon} alt="Add Doctor" className="w-6 h-6" />
              <span>Add Doctor</span>
            </NavLink>
          </li>

          {/* Doctors List */}
          <li>
            <NavLink
              to="/doctor-list"
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
                alt="Doctors List"
                className="w-6 h-6"
              />
              <span>Doctors List</span>
            </NavLink>
          </li>
        </ul>
      )}
      {dToken && (
        <ul className="space-y-4">
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
              <img src={assets.home_icon} alt="Dashboard" className="w-6 h-6" />
              <span>Dashboard</span>
            </NavLink>
          </li>

          {/* All Appointments */}
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

          {/* Doctors List */}
          <li>
            <NavLink
              to="/doctor-list"
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
                alt="Doctors List"
                className="w-6 h-6"
              />
              <span>Profile</span>
            </NavLink>
          </li>
        </ul>
      )}
    </aside>
  );
};

export default Sidebar;
