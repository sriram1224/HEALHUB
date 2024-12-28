import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { backendurl, setToken } = useContext(AppContext); // Remove token from destructuring

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
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h1>{state}</h1>
      <form onSubmit={onSubmit}>
        {state === "Sign Up" && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{state}</button>
      </form>
      <button
        onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
      >
        {state === "Sign Up" ? "Switch to Login" : "Switch to Sign Up"}
      </button>
    </div>
  );
};

export default Login;
