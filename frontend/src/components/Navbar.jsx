import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="sticky top-0 w-full backdrop-blur-sm bg-white/30 shadow-lg z-10">
      <div className="flex flex-wrap items-center justify-between mx-auto px-4 sm:px-6 py-3 sm:py-4">
        {/* Brand Logo */}
        <a href="/" className="flex items-center space-x-3">
          <span
            onClick={() => navigate("/")}
            className="self-center text-3xl sm:text-4xl font-bold bg-gradient-to-b from-[#6c382c] via-[#814e33] to-[#9481b3] bg-clip-text text-transparent"
          >
            H E A L H U B
          </span>
        </a>
        {/* User Profile and Auth Buttons */}
        <div className="flex items-center gap-2 sm:gap-4 md:order-2">
          {token ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              {userData.image ? (
                <img
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-300 shadow-md"
                  src={userData.image}
                  alt="User"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-user"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                </svg>
              )}
              <img
                className="w-2.5"
                src={assets.dropdown_icon}
                alt="Dropdown Icon"
              />
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-48 bg-white shadow-lg rounded-md flex flex-col gap-4 p-4">
                  <p
                    onClick={() => navigate("/my-profile")}
                    className="hover:text-black cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/my-appointment")}
                    className="hover:text-black cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={logout}
                    className="hover:text-black cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-white hover:text-black hover:border hover:border-blue-500 duration-300"
            >
              Create an account
            </button>
          )}
          {/* Mobile Menu Button */}
          {token && (
            <button
              onClick={() => setShowMenu(!showMenu)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ml-1"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          )}
        </div>
        {/* Navigation Links */}
        {token && (
          <div
            className={`w-full md:flex md:w-auto md:order-1 ${
              showMenu ? "block" : "hidden"
            } transition-all duration-300 ease-in-out`}
            id="navbar-cta"
          >
            <ul className="flex transition-all duration-300 flex-col md:flex-row md:space-x-6 lg:space-x-8 text-blue-500 font-bold md:mt-0 mt-3 md:border-0 border-t border-gray-200 md:items-center">
              {[
                { path: "/", label: "HOME" },
                { path: "/doctors", label: "ALL DOCTORS" },
                { path: "/about", label: "ABOUT" },
                { path: "/contact", label: "CONTACT" },
              ].map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setShowMenu(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "block py-3 px-3 md:py-2 md:px-0 text-[#6523a7] text-lg sm:text-xl border-b-2 border-blue-700 transition-colors duration-200"
                        : "block py-3 px-3 md:py-2 md:px-0 hover:text-blue-600 hover:border-b-2 hover:border-blue-500 transition-colors duration-200"
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
