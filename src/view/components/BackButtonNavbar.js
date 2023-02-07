import React from "react";
import { Link } from "react-router-dom";

import backButton from "../assets/back.png";

import "./styles/Navbar.css";

export default function BackButtonNavbar({ title, to, disabled }) {
  let events = disabled ? 'none' : 'auto';

  return (
    <>
      <div className="navbar">
        <Link to={to} style={{ pointerEvents: events }}>
          <img src={backButton} alt="back button icon" className="navbar-icon"/>
        </Link>
        <span className="navbar-title">{title}</span>
      </div>
      <div className="navbar-padding"></div>
    </>
  );
}