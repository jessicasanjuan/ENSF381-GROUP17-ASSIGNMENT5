import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpg";
import "../styles.css";

const Header = () => {
  return (
    <div>
      <header className="header">
        <div className="header-left">
          <img src={logo} alt="LMS Logo" width="100px" height="100px" />
        </div>
        <div className="header-right">
          <h1>LMS - Learning Management System</h1>
        </div>
      </header>

      <nav className="menu">
        <Link to="/" className="menu-link">Home</Link>
        <Link to="/courses" className="menu-link">Courses</Link>
        <Link to="/login" className="menu-link">Login</Link>      
      </nav>
    </div>
  );
};

export default Header;
