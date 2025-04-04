import React from "react";
import "../styles.css";

const DisplayStatus = ({ type, message }) => {
  const className = type === "success" ? "status-success" : "status-error";

  return (
    <div className={`status-message ${className}`}>
      {message}
    </div>
  );
};

export default DisplayStatus;
