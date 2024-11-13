import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-blue-700 p-4">
      <img src={assets.logo} alt="Logo" className="h-10" />
      <ul className="flex space-x-4 text-white">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-yellow-400" : "hover:text-yellow-300"
          }
        >
          <li className="relative">
            HOME
            <hr className="absolute left-0 right-0 bottom-0 h-1 bg-yellow-300 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100" />
          </li>
        </NavLink>
        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            isActive ? "text-yellow-400" : "hover:text-yellow-300"
          }
        >
          <li className="relative">
            ALL DOCTORS
            <hr className="absolute left-0 right-0 bottom-0 h-1 bg-yellow-300 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100" />
          </li>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-yellow-400" : "hover:text-yellow-300"
          }
        >
          <li className="relative">
            ABOUT
            <hr className="absolute left-0 right-0 bottom-0 h-1 bg-yellow-300 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100" />
          </li>
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "text-yellow-400" : "hover:text-yellow-300"
          }
        >
          <li className="relative">
            CONTACT
            <hr className="absolute left-0 right-0 bottom-0 h-1 bg-yellow-300 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100" />
          </li>
        </NavLink>
      </ul>
      <div>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300">
          Create an account
        </button>
      </div>
    </div>
  );
};

export default Navbar;
