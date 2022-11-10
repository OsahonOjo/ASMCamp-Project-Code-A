/* libraries */
import React from "react";

/* style */
import "../styles/Navbar.css";

function HamburgerNavbar({ text }) {

  return (
    <>
      <div className="navbar">
        <div className="navbar-icon"></div>
        <p className="navbar-title">{text}</p>
      </div>
      <div className="navbar-padding"></div>
    </>
  );
}

export default HamburgerNavbar;
