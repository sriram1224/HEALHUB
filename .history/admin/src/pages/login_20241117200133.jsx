import { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Admin");
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-gray-900">
      <form className="bg-gradient-to-br from-gray-800 to-gray-900 border border-blue-600 p-8 rounded-xl shadow-2xl transform hover:scale-105 transition duration-300">
        <div className="mb-6">
          <p className="text-3xl font-extrabold text-center text-white tracking-wider">
            {state} Login
          </p>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-white mb-2">
            Email
          </label>
          <input
            type="text"
            required
            placeholder="Enter your email"
            className="w-full p-3 text-sm text-white bg-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-white mb-2">
            Password
          </label>
          <input
            type="password"
            required
            placeholder="Enter your password"
            className="w-full p-3 text-sm text-white bg-gray-800 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-4 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-400 focus:outline-none transition-all"
        >
          Login
        </button>
        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
