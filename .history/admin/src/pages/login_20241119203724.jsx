import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAtoken, backendurl } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const requestData = { email, password };
        console.log("Request Data:", requestData);

        const { data } = await axios.post(
          `${backendurl}/api/admin/login`,
          requestData
        );
        if (data.success) {
          localStorage.setItem("atoken", data.token);
          setAtoken(data.token);
          toast.success("Login successful!");
        } else {
          toast.error(data.message || "Invalid credentials");
        }
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside 2xx range
        console.error("Response Data:", error.response.data);
        console.error("Response Status:", error.response.status);
        toast.error(error.response.data.message || "Invalid credentials");
      } else if (error.request) {
        // Request was sent but no response was received
        console.error("Request Error:", error.request);
        toast.error("No response from server");
      } else {
        // Something else went wrong
        console.error("Error:", error.message);
        toast.error("An error occurred");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-800">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg bg-gradient-to-br from-gray-800 to-black border border-gray-400 p-8 rounded-xl"
      >
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
            value={email}
            required
            className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-8">
          <label className="block text-base font-medium text-blue-300 mb-3">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
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
      <ToastContainer />
    </div>
  );
};

export default Login;
