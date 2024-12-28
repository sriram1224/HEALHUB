/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAtoken, backendurl } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state == "Admin") {
        const { data } = await axios.post(backendurl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          setAtoken(data.token);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-800">
      <form className="w-full max-w-lg bg-gradient-to-br from-gray-800  to-black border border-gray-400 p-8 rounded-xl ">
        <div className="mb-8">
          <p className="text-4xl font-extrabold text-center text-white tracking-wide">
            {state} Login
          </p>
        </div>
        <div className="mb-8">
          <label className="block text-base font-medium text-blue-300 mb-3">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="Enter your email"
            className="w-full p-4 text-sm text-white bg-gray-800 border border-gray-500 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
          />
        </div>
        <div className="mb-8">
          <label className="block text-base font-medium text-blue-300 mb-3">
            Password
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="password"
            required
            placeholder="Enter your password"
            className="w-full p-4 text-sm text-white bg-gray-800 border border-gray-500 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
          />
        </div>
        <button
          type="submit"
          className="w-2/6 ml-32 p-3 mt-4 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
        <div className="text-white text-center mt-6">
          {state === "Admin" ? (
            <p className="text-base">
              <span className="text-gray-300">Doctor Login</span>
              <span
                className="text-blue-500 font-bold ml-2 cursor-pointer hover:underline transition-all"
                onClick={() => {
                  setState("Doctor");
                }}
              >
                Click Here
              </span>
            </p>
          ) : (
            <p className="text-base">
              <span className="text-gray-300">Admin Login</span>
              <span
                className="text-blue-500 font-bold ml-2 cursor-pointer hover:underline transition-all"
                onClick={() => {
                  setState("Admin");
                }}
              >
                Click Here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
