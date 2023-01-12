import React from "react";
import { stack as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";

import profileIcon from '../assets/hexagons_Prosymbols_Premium.png';
import listIcon from "../assets/cell_Freepik.png";

import { styles } from "./styles/burgerStyles.js";
import './styles/icon.css';

function SideNavigationMenu() {

  const menuItems = [
    { url: "/tracks", itemTitle: "Learning Tracks", isIndented: false }, 
    { url: "/dashboard", itemTitle: "Student Dashboard", isIndented: false },
    { url: "/", itemTitle: "Progress and Rewards", isIndented: true }, 
    { url: "/", itemTitle: "Leaderboards", isIndented: true },
    { url: "/", itemTitle: "Instructors Area", isIndented: false },
    { url: "/", itemTitle: "Settings", isIndented: false },
    { url: "/", itemTitle: "Contact", isIndented: false }
  ];

  return (
    <Menu styles={styles}>
      <span>ASMCamp</span>
      <hr />

      <div>
        <img src={profileIcon} alt="user profile icon" className="icon--50px" />
        <span>Username</span>
      </div>
      <hr />

      {
        menuItems.map(menuItem => (
          <NavLink
            key={menuItem.itemTitle}
            to={menuItem.url} 
            style={menuItem.isIndented ? styles.indented : null}>
              <img src={listIcon} alt="list item icon" className="icon--20px" />
              <span>{menuItem.itemTitle}</span>
          </NavLink>
        ))
      }
      
    </Menu>
  );
}

export default SideNavigationMenu;

/* to make menu close when a link is clicked, you must specify onOpen and onClose like this 
        
      const [menuOpenState, setMenuOpenState] = React.useState(false);

      const handleStateChange = () => {
        setMenuOpenState(!menuOpenState);
      };

      const closeMenu = () => {
        setMenuOpenState(false);
      };

        isOpen={menuOpenState}
        onOpen={handleStateChange}
        onClose={handleStateChange}

        <NavLink
          to="/topic/all"
          onClick={() => closeMenu()}
          className="side-nav-menu-link" >
            Topics
        </NavLink>
    */