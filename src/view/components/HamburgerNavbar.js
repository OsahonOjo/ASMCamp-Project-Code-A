import React from "react";
import PropTypes from 'prop-types';

import "./styles/Navbar.css";

function HamburgerNavbar({ title }) {

  return (
    <>
      <div className="navbar">
        <div className="navbar-icon-placeholder"></div>
        <span className="navbar-title">{title}</span>
      </div>
      <div className="navbar-padding"></div>
    </>
  );
}

HamburgerNavbar.propTypes = {
  title: PropTypes.string
};

export default HamburgerNavbar;
