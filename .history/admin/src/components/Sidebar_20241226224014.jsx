import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <aside className="min-h-screen h-full p-4 w-20 md:w-60 bg-gray-100 dark:bg-black text-black dark:text-white transition-all   dark:border-gray-700 flex flex-col">
      {atoken && (
        <ul className="space-y-4">
          {/* Dashboard */}
          <li>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `flex items-center md:gap-3 p-3 rounded-lg ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-700 hover:text-white"
                }`
              }
            >
              <img
                src={assets.home_icon}
                alt="Dashboard"
                className="w-6 h-6 mx-auto md:mx-0"
              />
              <span className="hidden md:block">Dashboard</span>
            </NavLink>
          </li>

          {/* Appointments */}
          <li>
            <NavLink
              to="/all-appointments"
              className={({ isActive }) =>
                `flex items-center md:gap-3 p-3 rounded-lg ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-700 hover:text-white"
                }`
              }
            >
              <img
                src={assets.appointment_icon}
                alt="Appointments"
                className="w-6 h-6 mx-auto md:mx-0"
              />
              <span className="hidden md:block">Appointments</span>
            </NavLink>
          </li>

          {/* Add Doctor */}
          <li>
            <NavLink
              to="/add-doctor"
              className={({ isActive }) =>
                `flex items-center md:gap-3 p-3 rounded-lg ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-700 hover:text-white"
                }`
              }
            >
              <img
                src={assets.add_icon}
                alt="Add Doctor"
                className="w-6 h-6 mx-auto md:mx-0"
              />
              <span className="hidden md:block">Add Doctor</span>
            </NavLink>
          </li>
        </ul>
      )}
      {dToken && (
        <ul className="space-y-4">
          {/* Dashboard */}
          <li>
            <NavLink
              to="/doctor-dashboard"
              className={({ isActive }) =>
                `flex items-center md:gap-3 p-3 rounded-lg ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-700 hover:text-white"
                }`
              }
            >
              <img
                src={assets.home_icon}
                alt="Dashboard"
                className="w-6 h-6 mx-auto md:mx-0"
              />
              <span className="hidden md:block">Dashboard</span>
            </NavLink>
          </li>

          {/* Appointments */}
          <li>
            <NavLink
              to="/doctor-appointment"
              className={({ isActive }) =>
                `flex items-center md:gap-3 p-3 rounded-lg ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-700 hover:text-white"
                }`
              }
            >
              <img
                src={assets.appointment_icon}
                alt="Appointments"
                className="w-6 h-6 mx-auto md:mx-0"
              />
              <span className="hidden md:block">Appointments</span>
            </NavLink>
          </li>

          {/* Profile */}
          <li>
            <NavLink
              to="/doctor-profile"
              className={({ isActive }) =>
                `flex items-center md:gap-3 p-3 rounded-lg ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-700 hover:text-white"
                }`
              }
            >
              <img
                src={assets.people_icon}
                alt="Profile"
                className="w-6 h-6 mx-auto md:mx-0"
              />
              <span className="hidden md:block">Profile</span>
            </NavLink>
          </li>
        </ul>
      )}
    </aside>
  );
};

export default Sidebar;
