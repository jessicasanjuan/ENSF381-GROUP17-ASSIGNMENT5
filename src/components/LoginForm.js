import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { createContext } from 'react';
import AuthMessage, { AuthContext } from "./AuthMessage";
import "../styles.css";

export const idContext = createContext(null);

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
      await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'username':username, 'password':password}),
      })
      .then(response => {
        if (response.ok) {
          navigate('/courses');
          return response.json();
        }
        else throw new Error('Authentication failed');
      })
      .then(data => {
        setAuthStatus(data.message);
  })
      .catch(error => setAuthStatus('Authentication failed. Incorrect username or password.'));
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
          <p style={{ marginTop: '15px' }}>
            <Link to="/signup" id="signup">Don't have an account? Sign Up</Link>
          </p>
        </form>
      </div>
    </AuthContext.Provider>
  );
};

export default LoginForm;