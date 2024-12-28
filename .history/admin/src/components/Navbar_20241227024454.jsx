import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { ThemeContext } from "../context/ThemeContext";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { atoken, setAtoken } = useContext(AdminContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");

    atoken && setAtoken("");
    atoken && localStorage.removeItem("atoken");
    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
  };

  return (
    <nav
      className={`p-4 shadow-md  text-white transition-all duration-300 ease-in-out sticky top-0 ${
        theme === "dark" ? "bg-gray-800 text-blue-500" : "bg-[#EDE8F5]"
      } `}
    >
      <div className="flex items-center justify-between px-6">
        {/* Logo and User Role */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-blue-500">
            H E A L H U B
          </h1>
          <p className="px-4 py-1 rounded-full border border-yellow-400 text-gradient-to-r from-yellow-300 to-orange-400">
            {atoken ? "Admin" : "Doctor"}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          {atoken || dToken ? (
            <button
              onClick={logout}
              className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={navigate("/")}
              className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-300"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
