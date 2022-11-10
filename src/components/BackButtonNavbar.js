/* libraries */
import React from "react";
import { Link } from "react-router-dom";

/* assets */
import backButton from "../assets/back.png";

/* styles */
import "../styles/Navbar.css";

function BackButtonNavbar({ text, to }) {

  return (
    <>
      <div className="navbar">
        <Link to={to}><img src={backButton} alt="back button icon" className="navbar-icon"/></Link>
        <p className="navbar-title">{text}</p>
      </div>
      <div className="navbar-padding"></div>
    </>
  );
}

export default BackButtonNavbar;

