import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { userAPI } from "../services/api";

const Login: React.FC = () => {
  const [currentState, setCurrentState] = useState<"Login" | "Sign Up">("Login");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      if (currentState === "Login") {
        // Validate email and password before sending request
        if (!email.trim()) {
          setError("Email is required");
          setLoading(false);
          return;
        }
        if (!password) {
          setError("Password is required");
          setLoading(false);
          return;
        }

        const response = await userAPI.login(email, password);
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        // Validate registration fields
        if (!name.trim()) {
          setError("Name is required");
          setLoading(false);
          return;
        }
        if (!email.trim()) {
          setError("Email is required");
          setLoading(false);
          return;
        }
        if (password.length < 8) {
          setError("Password must be at least 8 characters");
          setLoading(false);
          return;
        }

        const response = await userAPI.register(name, email, password);
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/");
      }
    } catch (err) {
      console.error("Authentication failed:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(currentState === "Login" ? "Invalid email or password" : "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      {/* Header */}
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl prata-regular">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* Name input only for Sign Up */}
      {currentState === "Sign Up" && (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}

      {/* Email input */}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="hello@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Password input */}
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      
      {/* Error message */}
      {error && (
        <p className="w-full text-sm text-red-600">{error}</p>
      )}

      {/* Links */}
      <div className="flex justify-between w-full text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create a new account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login here
          </p>
        )}
      </div>

      {/* Submit button */}
      <button 
        className="px-8 py-2 mt-4 font-light text-white bg-black disabled:bg-gray-400"
        disabled={loading}
      >
        {loading 
          ? (currentState === "Login" ? "Logging in..." : "Signing Up...") 
          : (currentState === "Login" ? "Login" : "Sign Up")
        }
      </button>
    </form>
  );
};

export default Login;
