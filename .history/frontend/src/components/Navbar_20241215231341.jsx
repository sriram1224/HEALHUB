import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <nav className="bg-black border-gray-200">
      <div className=" border-b-2 border-blue-300 flex flex-wrap items-center justify-between mx-auto rounded-lg p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span
            onClick={() => navigate("/")}
            className="self-center text-2xl font-semibold whitespace-nowrap text-blue-500 russo-one-regular"
          >
            H E A L H U B
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {token ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img
                className="w-8 rounded-full"
                src={assets.profile_pic}
                alt=""
              />
              <img className="w-2.5" src={assets.dropdown_icon} alt="" />
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                  <p
                    onClick={() => navigate("my-profile")}
                    className="hover:text-black cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("my-appointment")}
                    className="hover:text-black cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={() => {
                      logout();
                    }}
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
          <button
            onClick={() => setShowMenu(!showMenu)} // Toggle menu visibility
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-cta"
            aria-expanded={showMenu ? "true" : "false"}
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
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            showMenu ? "block" : "hidden"
          }`}
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border text-white rounded-lg bg-black md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-black">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 md:p-0 hover:text-blue-700 border-b-2 border-blue-900"
                    : "block py-2 px-3 md:p-0 hover:border-b-2 hover:text-blue-500 hover:border-blue-700"
                }
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/doctors"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 md:p-0 border-b-2 border-blue-700 hover:text-blue-700"
                    : "block py-2 px-3 md:p-0 hover:border-b-2 hover:text-blue-500 hover:border-blue-900"
                }
              >
                ALL DOCTORS
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 md:p-0 border-b-2 border-blue-700 hover:text-blue-700"
                    : "block py-2 px-3 md:p-0 hover:border-b-2 hover:text-blue-500 hover:border-blue-900"
                }
              >
                ABOUT
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 md:p-0 border-b-2 border-blue-700 hover:text-blue-700"
                    : "block py-2 px-3 md:p-0 hover:border-b-2 hover:text-blue-500 hover:border-blue-900"
                }
              >
                CONTACT
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
