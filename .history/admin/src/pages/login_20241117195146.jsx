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
          <div></div>
        </div>
      </form>
    </div>
  );
};

export default Login;
