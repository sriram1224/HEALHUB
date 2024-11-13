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
    <div>
      <form action="">
        <div>
          <p></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
