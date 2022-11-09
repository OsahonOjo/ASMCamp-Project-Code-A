/* libraries */
import React from "react";
import {slide as Menu } from 'react-burger-menu';
//import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

/* assets */
import userProfileIcon from "../assets/share.png";

/* styles */
import "../styles/SideNavigationMenu.css";
import { styles } from '../styles/burgerStyles.js';

function SideNavigationMenu({ classChangeTrigger, setMenuStateHidden }) {

  const menuRef = React.useRef(null);

  return (
    <Menu styles={styles} id="side-nav-menu" >
      
      <div>
        <img src={userProfileIcon} alt="user profile icon" id="side-nav-menu-profile-icon"/>
        <p>User Name</p>
      </div>
      
      <hr></hr>
      
      <a href="#">Topics</a>
      <a href="#">Dashboard</a>
      <div className="indented">
        <a href="#">Learning Objectives</a>
        <a href="#">XP Points</a>
        <a href="#">Badges</a>
        <a href="#">Grade</a>
      </div>
      <a href="#">Leaderboard</a>

      <hr></hr>
      
      <a href="#">For Teachers</a>
      
      <hr></hr>
      
      <a href="#">Settings</a>
      <a href="#">Contact</a>
    </Menu>
  );
}

export default SideNavigationMenu;
