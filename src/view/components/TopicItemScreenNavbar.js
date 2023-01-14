import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import backButton from "../assets/back.png";
import homeIcon from '../assets/hexagons_Prosymbols_Premium.png';
import viewLessonIcon from '../assets/hexagons_Prosymbols_Premium.png';

import "./styles/Navbar.css";
import "./styles/icon.css";

/* interface BackButtonNavbarProps {
  title: string;
  to: string;
} */

function TopicItemScreenNavbar({ title, to, itemType }) {

  const HOME_URL = "/tracks";
  const LESSON_URL = "/course";
  // const backButton = "../assets/back.png";
  // const homeIcon = '../assets/hexagons_Prosymbols_Premium.png';
  // const viewLessonIcon = '../assets/hexagons_Prosymbols_Premium.png';

  return (
    <>
      <div className="navbar">
        <Link to={to}>
          <img src={backButton} alt="back button icon" className="navbar-icon"/>
        </Link>
        <span className="navbar-title">{title}</span>
        <Link to={LESSON_URL}>
          <img src={viewLessonIcon} alt="view lesson icon" className="icon--30px"/>
        </Link>
        <Link to={HOME_URL}>
          <img src={homeIcon} alt="home icon" className="icon--30px"/>
        </Link>
      </div>
      <div className="navbar-padding"></div>
    </>
  );
}

TopicItemScreenNavbar.propTypes = {
  title: PropTypes.string,
  to: PropTypes.string
};

export default TopicItemScreenNavbar;

