import React from "react";
import { stack as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";

import profileIcon from '../assets/hexagons_Prosymbols_Premium.png';
import menuItemIcon from "../assets/cell_Freepik.png";

import { styles as burgerStyles } from "./styles/burgerStyles";
import { styles as frequentStyles } from "./styles/commonDisplayStyles";


import { constants } from "../../modelsAndData/constants";

export default function SideNavigationMenu({ username }) {

  const HEADING_PADDING_TOP = "20px";
  const MENU_ITEM_ICON_MARGIN_RIGHT = '15px';
  const PROFILE_SECTION_PADDING = "15px";
  const LEFT_SPACE_DEFAULT = '20px';  // "SPACE" being either padding or margin
  const LEFT_SPACE_INDENTED = '30px';

  const { PRIMARY_TEXT_COLOR_DARK, SECONDARY_BACKGROUND_COLOR_DARK } = constants;
  const TEXT_COLOR = PRIMARY_TEXT_COLOR_DARK;
  const LINE_COLOR = frequentStyles.vDarkModeTextColor1;
  const DEFAULT_MARGIN = '10px';
  const DEFAULT_MARGIN_X2 = '20px';
  const DEFAULT_MARGIN_X3 = '30px';
  const DEFAULT_PADDING = '10px';

  let playerName = username ? username : "FirstName LastName";

  const menuItems = [
    { url: "/tracks", itemTitle: "Learning Tracks", isIndented: false }, 
    { url: "/students", itemTitle: "Student Dashboard", isIndented: false },
    { url: "/students/progress", itemTitle: "Progress and Rewards", isIndented: true }, 
    { url: "/students/leaderboards", itemTitle: "Leaderboards", isIndented: true },
    { url: "/instructors", itemTitle: "Instructors Area", isIndented: false },
    { url: "/", itemTitle: "Settings", isIndented: false },
    { url: "/", itemTitle: "Contact", isIndented: false }
  ];

  const menuHeading = <span style={{ marginLeft: LEFT_SPACE_DEFAULT, fontWeight: 'bold', fontVariant: 'small-caps' }}>ASMCamp</span>;

  const userProfileSection =
    <div style={{ padding: PROFILE_SECTION_PADDING, display: 'flex' }}>
      {/* <img 
        src={profileIcon} 
        alt="profile photo" 
        style={frequentStyles.icon50px} /> */}
      <span 
        className="material-symbols-outlined" 
        style={{ ...frequentStyles.profileIcon, marginRight: DEFAULT_MARGIN, color: '#444' }}>
          account_circle
      </span>
      <span style={{ marginLeft: LEFT_SPACE_DEFAULT }}>{playerName}</span>
    </div>;

  return (
    <Menu styles={burgerStyles}>
      <div style={{ paddingTop: HEADING_PADDING_TOP }}>
        {menuHeading}
        <hr style={{ borderColor: LINE_COLOR }}/>

        {userProfileSection}
        <hr style={{ borderColor: LINE_COLOR, marginBottom: '5px' }} />
      </div>

      <NavLink
          key={menuItems[0].itemTitle}
          to={menuItems[0].url}
          style={ 
            menuItems[0].isIndented 
              ? { marginLeft: LEFT_SPACE_INDENTED } 
              : { marginLeft: LEFT_SPACE_DEFAULT }}>

                {/* <span 
                  className="material-symbols-outlined" 
                  style={{ ...frequentStyles.mainIcon24pxFont, marginRight: DEFAULT_MARGIN, color: '#444' }}>
                    person
                </span> */}
                {/* <span style={{ marginRight: DEFAULT_MARGIN }}>
                  <i className="fa fa-road" style={{ ...frequentStyles.mainIcon24pxFont, color: '#444' }}></i>
                </span> */}
                <span className="material-symbols-outlined" style={{ ...frequentStyles.mainIcon24pxFont, marginRight: DEFAULT_MARGIN }}>
                  conversion_path
                </span>
                <span style={{ color: TEXT_COLOR }}>
                  {menuItems[0].itemTitle}
                </span>

        </NavLink>

        <NavLink
          key={menuItems[4].itemTitle}
          to={menuItems[4].url}
          style={ 
            menuItems[4].isIndented 
              ? { marginLeft: LEFT_SPACE_INDENTED } 
              : { marginLeft: LEFT_SPACE_DEFAULT }}>

                <span 
                  className="material-symbols-outlined" 
                  style={{ ...frequentStyles.mainIcon24pxFont, marginRight: DEFAULT_MARGIN, color: '#444' }}>
                    supervisor_account
                </span>
                <span style={{ color: TEXT_COLOR }}>
                  {menuItems[4].itemTitle}
                </span>

        </NavLink>
      
    </Menu>
  );
}

/* 
    /* <img 
      src={menuItemIcon} 
      alt="menu item icon" 
      style={{ marginRight: MENU_ITEM_ICON_MARGIN_RIGHT, ...frequentStyles.icon20px }} /> *


    to make menu close when a link is clicked, you must specify onOpen and onClose like this 
        
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