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
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
