import { useEffect, useState, useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const { backendurl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  // Resolve API base URL robustly
  const apiBase = useMemo(() => {
    // Prefer context, else Vite env var
    const fromCtx =
      backendurl && typeof backendurl === "string" ? backendurl.trim() : "";
    const fromEnv =
      import.meta?.env?.VITE_API_URL &&
      typeof import.meta.env.VITE_API_URL === "string"
        ? import.meta.env.VITE_API_URL.trim()
        : "";
    const base = fromCtx || fromEnv || "";
    return base.endsWith("/") ? base.slice(0, -1) : base;
  }, [backendurl]);

  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!apiBase) {
      toast.error(
        "API base URL is not configured. Set backendurl in context or VITE_API_URL in .env"
      );
      console.error(
        "Missing API base URL. backendurl:",
        backendurl,
        "VITE_API_URL:",
        import.meta?.env?.VITE_API_URL
      );
      return;
    }

    if (submitting) return;
    setSubmitting(true);

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(`${apiBase}/api/user/register`, {
          name,
          email,
          password,
        });

        if (data?.success && data?.token) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Registered successfully");
        } else {
          toast.error(data?.message || "Registration failed");
        }
      } else {
        const { data } = await axios.post(`${apiBase}/api/user/login`, {
          email,
          password,
        });

        if (data?.success && data?.token) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Logged in successfully");
        } else {
          toast.error(data?.message || "Login failed");
        }
      }
    } catch (err) {
      // Surface details for 404s and other errors
      const status = err?.response?.status;
      const url = err?.config?.url;
      console.error("AxiosError", { status, url, err });
      if (status === 404) {
        toast.error(`Endpoint not found (404): ${url || "unknown URL"}`);
      } else {
        toast.error(
          err?.response?.data?.message || err?.message || "Request failed"
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#EDE8F5] text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3D52A0] rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7091E6] rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={onSubmit}
        className="relative p-10 bg-white border-2 border-[#3D52A0] rounded-2xl shadow-2xl w-full max-w-md mx-4"
      >
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-b from-[#6c382c] via-[#814e33] to-[#421984] bg-clip-text text-transparent">
            {state === "Sign Up" ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-lg font-medium text-gray-600 mb-6">
            {state === "Sign Up"
              ? "Join us to access personalized healthcare services"
              : "Sign in to continue your healthcare journey"}
          </p>
        </div>

        {state === "Sign Up" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <label
              className="block text-base font-semibold text-gray-700 mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3D52A0] focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
                autoComplete="name"
              />
            </div>
          </motion.div>
        )}

        <div className="mb-6">
          <label
            className="block text-base font-semibold text-gray-700 mb-2"
            htmlFor="email"
          >
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3D52A0] focus:border-transparent transition-all duration-200"
              placeholder="your.email@example.com"
              autoComplete="email"
            />
          </div>
        </div>

        <div className="mb-8">
          <label
            className="block text-base font-semibold text-gray-700 mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3D52A0] focus:border-transparent transition-all duration-200"
              placeholder="••••••••"
              autoComplete={
                state === "Sign Up" ? "new-password" : "current-password"
              }
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={submitting}
          className={`w-full bg-gradient-to-r from-[#3D52A0] to-[#421984] text-white font-bold py-3 rounded-lg shadow-lg transition duration-300 mb-6 ${
            submitting ? "opacity-60 cursor-not-allowed" : "hover:shadow-xl"
          }`}
        >
          {submitting
            ? state === "Sign Up"
              ? "Creating..."
              : "Signing in..."
            : state === "Sign Up"
            ? "Create Account"
            : "Sign In"}
        </motion.button>

        <div className="text-center text-gray-600">
          {state === "Sign Up" ? (
            <p className="flex justify-center items-center gap-2 text-sm">
              Already have an account?
              <button
                type="button"
                className="font-semibold text-[#3D52A0] hover:text-[#421984] transition-colors duration-200"
                onClick={() => setState("Login")}
                disabled={submitting}
              >
                Sign In
              </button>
            </p>
          ) : (
            <p className="flex justify-center items-center gap-2 text-sm">
              Don&apos;t have an account?
              <button
                type="button"
                className="font-semibold text-[#3D52A0] hover:text-[#421984] transition-colors duration-200"
                onClick={() => setState("Sign Up")}
                disabled={submitting}
              >
                Create Account
              </button>
            </p>
          )}
        </div>
      </motion.form>
    </div>
  );
};

export default Login;
