import { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { backendurl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendurl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          console.log("Registered");
          toast.success("Registered successfully");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendurl + "/api/user/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          console.log("Logged in");
          toast.success("Logged in successfully");
        } else {
          toast.error(data.message);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen  text-white">
      <form
        onSubmit={onSubmit}
        className=" p-10  bg-gradient-to-br from-transparent  to-[#8F96CE] rounded-lg shadow-md border w-[40%] "
      >
        <div className="mb-6 text-center">
          <p className="text-5xl text-[#3D52A0] font-bold mb-2">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </p>
          <p className="text-xl font-medium text-[#421984]">
            Please {state === "Sign Up" ? "sign up" : "log in"} to book an
            appointment
          </p>
        </div>
        {state === "Sign Up" && (
          <div className="mb-4">
            <label className="block text-xl text-[#421984]  font-bold mb-1" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#1a212e] text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-xl text-[#421984] font-bold mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded bg-[#1a212e] text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-xl text-[#421984] font-bold mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-[#1a212e] text-[#421984]  focus:outline-none "
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          {state === "Sign Up" ? "Sign Up" : "Login"}
        </button>
        <p className="text-center text-black font-bold text-xl gap-10 mt-4">
          {state === "Sign Up" ? (
            <span className=" flex justify-center  gap-3 ">
              Already have an account?
              <button
                type="submit"
                className="text-[#421984] text-xl hover:text-[#41256e]"
                onClick={() => setState("Login")}
              >
                Login
              </button>
            </span>
          ) : (
            <span className="text-black font-bold text-xl gap-10 mt-4">
              Dont have an account?
              <button
                type="button"
                className="text-[#8952e1] text-xl hover:text-[#41256e]"
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
