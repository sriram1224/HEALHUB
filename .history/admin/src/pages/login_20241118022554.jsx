/* eslint-disable no-unused-vars */
import { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Admin");
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
            type="password"
            required
            placeholder="Enter your password"
            className="w-full p-4 text-sm text-white bg-gray-800 border border-gray-500 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
          />
        </div>
        <button
          type="submit"
          className="w-2/6 ml-28 p-3 mt-4 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
