import React, { useState } from "react";
import "../styles/alert.styles.css"

function Alert({ message, setMessage }) {
    console.log(message)
  return (
    message && <div className="custom-alert-overlay">
      <div className="custom-alert-box">
        <div className="custom-alert-title">Alert !</div>
        <div className="custom-alert-message">{message}</div>
        <button className="custom-alert-button" onClick={()=>setMessage("")}>OK</button>
      </div>
    </div>
  );
}

export default Alert

