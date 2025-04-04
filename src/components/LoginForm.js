import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthMessage, { AuthContext } from "./AuthMessage";
import "../styles.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authStatus, setAuthStatus] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!username || !password) {
      setAuthStatus({ type: "error", message: "Both fields are required." });
      return false;
    }
    if (password.length < 8) {
      setAuthStatus({ type: "error", message: "Password must be at least 8 characters." });
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await res.json();
      const user = users.find(
        (u) => u.username === username && u.email === password
      );

      if (user) {
        setAuthStatus({ type: "success", message: "Login successful! Redirecting..." });
        setTimeout(() => navigate("/courses"), 2000);
      } else {
        setAuthStatus({ type: "error", message: "Invalid credentials." });
      }
    } catch (err) {
      setAuthStatus({ type: "error", message: "Login failed. Please try again." });
    }
  };

  return (
    <AuthContext.Provider value={{ authStatus }}>
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2 className="page-title">Login</h2>
          <AuthMessage />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="enroll-button">Login</button>
          <p className="forgot">Forgot Password?</p>
        </form>
      </div>
    </AuthContext.Provider>
  );
};

export default LoginForm;
