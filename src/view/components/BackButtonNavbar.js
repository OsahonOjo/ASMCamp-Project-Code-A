import React from "react";
import { Link } from "react-router-dom";

import { styles } from "./styles/commonDisplayStyles";
import { styles as burgerStyles } from "./styles/burgerStyles";
import "./styles/Navbar.css";

export default function BackButtonNavbar({ title, to, disabled }) {

  const TEXT_COLOR = styles.vDarkModeTextColor3;

  return (
    <>
      <div className="navbar">
        <Link 
          to={to}
          className="navbar-icon">
            <span 
              className="material-symbols-outlined" 
              style={{ ...styles.icon50pxFont, color: TEXT_COLOR }}>
                arrow_back_ios_new
            </span>
        </Link>
        <span className="navbar-title">{title}</span>
      </div>
      <div className="navbar-padding"></div>
    </>
  );
}

// let events = disabled ? 'none' : 'auto';
// style={{ pointerEvents: events }}
// import backButton from "../assets/back.png";
// <img src={backButton} alt="back button icon" className="navbar-icon"/>
