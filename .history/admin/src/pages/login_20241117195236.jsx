/* eslint-disable no-unused-vars */
import { useState } from "react";
import { assets } from "../assets/assets";

const Login = () => {
  const [state, setState] = useState("Admin");
  return (
    <div>
      <form>
        <div>
          <p>
            <span>{state}</span>
            Login
          </p>
          <div>
            <p>Email</p>
            <input type="text" required />
          </div>
          <div>
            <p>password</p>
            <input type="text" required />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
