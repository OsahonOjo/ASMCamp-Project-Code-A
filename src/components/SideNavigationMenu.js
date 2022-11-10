/* libraries */
import React from "react";
import {slide as Menu } from 'react-burger-menu';  /* https://www.npmjs.com/package/react-burger-menu */
import { NavLink } from "react-router-dom";

/* assets */
import userProfileIcon from "../assets/share.png";

/* styles */
import "../styles/SideNavigationMenu.css";
import { styles } from '../styles/burgerStyles.js';

function SideNavigationMenu() {

  const menuRef = React.useRef(null);
  const [menuOpenState, setMenuOpenState] = React.useState(false);

  const handleStateChange = () => { setMenuOpenState(!menuOpenState) }
  const closeMenu = () => { setMenuOpenState(false) }

  return (

    /* to make menu close when a link is clicked, you must specify onOpen and onClose like this */

    <Menu styles={styles} id="side-nav-menu" isOpen={menuOpenState} onOpen={handleStateChange} onClose={handleStateChange}>
      
      <div>
        <img src={userProfileIcon} alt="user profile icon" id="side-nav-menu-profile-icon"/>
        <p>User Name</p>
      </div>
      
      <hr />
      
      {/* you want to call closeMenu() and return its result here, not just pass its name closeMenu */}
      
      <NavLink to="/topic/all" onClick={() => closeMenu()} className="side-nav-menu-link">Topics</NavLink>
      <NavLink to="/" onClick={() => closeMenu()} className="side-nav-menu-link">Dashboard</NavLink>
      <a href="#" className="indented side-nav-menu-link">Learning Objectives</a>
      <a href="#" className="indented side-nav-menu-link">XP Points</a>
      <a href="#" className="indented side-nav-menu-link">Badges</a>
      <a href="#" className="indented side-nav-menu-link">Grade</a>

      <a href="#" className="side-nav-menu-link">Leaderboard</a>

      <hr />
      
      <a href="#" className="side-nav-menu-link">For Teachers</a>
      
      <hr />
      
      <a href="#" className="side-nav-menu-link">Settings</a>
      <a href="#" className="side-nav-menu-link">Contact</a>
    </Menu>
  );
}

export default SideNavigationMenu;
