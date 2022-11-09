/* libraries */
import React from "react";

/* assets */
import backButton from "../assets/back.png";

/* styles */
import "../styles/Navbar.css";

function BackButtonNavbar({ text }) {

  return (
    <div className="navbar">
      <img src={backButton} alt="back button icon" className="navbar-icon"/>
      <p className="navbar-title">{text}</p>
    </div>
  );
}

export default BackButtonNavbar;

