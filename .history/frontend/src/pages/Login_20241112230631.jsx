import { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900 text-white">
      <form
        onSubmit={onSubmit}
        className="bg-black p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="mb-6 text-center">
          <p className="text-2xl font-bold mb-2">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </p>
          <p className="text-sm">
            Please {state === "Sign Up" ? "sign up" : "log in"} to book an
            appointment
          </p>
        </div>
        {state === "Sign Up" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          {state === "Sign Up" ? "Sign Up" : "Login"}
        </button>
        <p className="text-center mt-4 text-sm">
          {state === "Sign Up" ? (
            <span>
              Already have an account?
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => setState("Login")}
              >
                Login
              </button>
            </span>
          ) : (
            <span>
              Dont have an account?
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => setState("Sign Up")}
              >
                Sign Up
              </button>
            </span>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;