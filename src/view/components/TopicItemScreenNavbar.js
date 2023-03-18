import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import backButton from "../assets/back.png";
import viewLessonIcon from '../assets/hexagons_Prosymbols_Premium.png';

import { topicItemTypes } from "../../modelsAndData/enums";
import { constants } from "../../modelsAndData/constants";

import "./styles/Navbar.css";
import "./styles/icon.css";
import { styles } from "./styles/commonDisplayStyles";

/* interface BackButtonNavbarProps {
  title: string;
  to: string;
} */

export default function TopicItemScreenNavbar({ title, to, itemType, disabled }) {

  const HOME_URL = "/tracks";
  const LESSON_URL = "/course";
  let events = disabled ? 'none' : 'auto';

  const { PRIMARY_TEXT_COLOR_DARK } = constants;
  const TEXT_COLOR = PRIMARY_TEXT_COLOR_DARK;

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

        <div style={{ position: 'fixed', top: '25px', right: '25px' }}>
          <Link to={HOME_URL}>
            <i className="fa fa-home" style={{ ...styles.navbarIcon24pxFont, color: TEXT_COLOR, textAlign: 'right' }}></i>
          </Link>
        </div>
        
      </div>
      <div className="navbar-padding"></div>
    </>
  );
}

TopicItemScreenNavbar.propTypes = {
  title: PropTypes.string,
  to: PropTypes.string
};