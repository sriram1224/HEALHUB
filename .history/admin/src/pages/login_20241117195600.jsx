/* eslint-disable no-unused-vars */
import { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Admin");
  return (
    <div className="flex items-center justify-center min-h-screen bg-black backdrop-blur-sm">
      <form className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <p className="text-2xl font-bold text-center text-gray-800">
            <span>{state}</span> Login
          </p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700">Email</p>
          <input
            type="text"
            required
            className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <p className="text-gray-700">Password</p>
          <input
            type="password"
            required
            className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
