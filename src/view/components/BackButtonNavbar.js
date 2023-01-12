import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import backButton from "../assets/back.png";

import "./styles/Navbar.css";

function BackButtonNavbar({ title, to }) {

  return (
    <>
      <div className="navbar">
        <Link to={to}>
          <img src={backButton} alt="back button icon" className="navbar-icon"/>
        </Link>
        <span className="navbar-title">{title}</span>
      </div>
      <div className="navbar-padding"></div>
    </>
  );
}

BackButtonNavbar.propTypes = {
  title: PropTypes.string,
  to: PropTypes.string
};

export default BackButtonNavbar;

