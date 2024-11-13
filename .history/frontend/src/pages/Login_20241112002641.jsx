import { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Sign in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="text-white">
      <form action="">
        <div>
          <p>{state === "Sign Up" ? "Create Account" : "Login"}</p>
        </div>
      </form>
    </div>
  );
};

export default Login;
