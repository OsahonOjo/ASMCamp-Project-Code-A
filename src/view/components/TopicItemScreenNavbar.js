import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import backButton from "../assets/back.png";
import viewLessonIcon from '../assets/hexagons_Prosymbols_Premium.png';

import { topicItemTypes } from "../../model/enums";

import "./styles/Navbar.css";
import "./styles/icon.css";
import { commonDisplayStyles } from "./styles/commonDisplayStyles";

/* interface BackButtonNavbarProps {
  title: string;
  to: string;
} */

export default function TopicItemScreenNavbar({ title, to, itemType, disabled }) {

  const HOME_URL = "/tracks";
  const LESSON_URL = "/course";
  let events = disabled ? 'none' : 'auto';

  return (
    <>
      <div className="navbar">

        <Link to={to} style={{ pointerEvents: events }}>
          <img src={backButton} alt="back button icon" className="navbar-icon"/>
        </Link>

        <span className="navbar-title">{title}</span>

        {/* <Link to={LESSON_URL}>
          <img src={viewLessonIcon} alt="view lesson icon" className="icon--30px"/>
        </Link> */}

        <Link to={HOME_URL}>
          <i className="fa fa-home" style={commonDisplayStyles.icon24Style}></i>
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