/* Side Navigation Menu behavior:
 * - the menu is hidden and made visible based on the styles applied 
 *   to one of two classes, that can be assigned to the menu:
 *    - the "side-nav-menu-open" class to make the menu visible
 *    - the "side-nav-menu-closed" class to hide the menu
 */

/* libraries */
import React from "react";
//import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

/* assets */
import userProfileIcon from "../assets/share.png";

/* styles */
import "../styles/SideNavigationMenu.css";

function SideNavigationMenu({ classChangeTrigger, setMenuStateHidden }) {

  const SIDE_NAV_MENU_VISIBLE_CLASS = "side-nav-menu-visible";
  const SIDE_NAV_MENU_HIDDEN_CLASS = "side-nav-menu-hidden";

  const menuRef = React.useRef(null);

  return (
    <div id="side-nav-menu" className={classChangeTrigger ? SIDE_NAV_MENU_VISIBLE_CLASS : SIDE_NAV_MENU_HIDDEN_CLASS} ref={menuRef}>
      <div id="side-nav-menu-header">
        <p id="side-nav-menu-title">ASMCamp</p>  
        <button 
          id="side-nav-menu-close-button"
          onClick={() => {
            menuRef.current.className={SIDE_NAV_MENU_HIDDEN_CLASS}; 
            setMenuStateHidden(); 
        }}>&times;</button>
      </div>

      <hr></hr>
      
      <div id="side-nav-menu-profile">
        <img src={userProfileIcon} alt="user profile icon" id="side-nav-menu-profile-icon"/>
        <p id="side-nav-menu-profile-name">User Name</p>
      </div>
      
      <hr></hr>
      
      <div>
        <a href="#" className="side-nav-menu-link">Topics</a>
        <a href="#" className="side-nav-menu-link">Dashboard</a>
        <div className="indented">
          <a href="#" className="side-nav-menu-link">Learning Objectives</a>
          <a href="#" className="side-nav-menu-link">XP Points</a>
          <a href="#" className="side-nav-menu-link">Badges</a>
          <a href="#" className="side-nav-menu-link">Grade</a>
        </div>
        <a href="#" className="side-nav-menu-link">Leaderboard</a>
        <hr></hr>
        <a href="#" className="side-nav-menu-link">For Teachers</a>
        <hr></hr>
        <a href="#" className="side-nav-menu-link">Settings</a>
        <a href="#" className="side-nav-menu-link">Contact</a>
      </div>
    </div>
  );
}

export default SideNavigationMenu;
