import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { ThemeContext } from "../context/ThemeContext";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

const Navbar = () => {
  const { atoken, setAtoken } = useContext(AdminContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    if (atoken) {
      setAtoken("");
      localStorage.removeItem("atoken");
    }
  };

  return (
    <nav
      className={`p-4 shadow-md  text-white transition-all duration-300 ease-in-out ${
        theme === "dark" ? "bg-gray-800 text-blue-500" : "bg-gray-100"
      } `}
    >
      <div className="flex items-center justify-between px-6">
        {/* Logo and User Role */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-blue-500">
            H E A L H U B
          </h1>
          <p className="px-4 py-1 rounded-full border border-blue-500 text-blue-500">
            {atoken ? "Admin" : "Doctor"}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg 
        ${
          theme === "dark"
            ? "border border-blue-500 text-blue-500"
            : "bg-blue-500"
        } 
        hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-md`}
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
            {theme === "dark" ? (
              <MdOutlineDarkMode className="font-extrabold text-xl" />
            ) : (
              <CiLight className="font-extrabold text-xl" />
            )}
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
