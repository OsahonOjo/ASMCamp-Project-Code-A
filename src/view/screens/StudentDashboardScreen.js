import React from "react";
import { Link } from "react-router-dom";

import SideNavigationMenu from "../components/SideNavigationMenu";
import HamburgerNavbar from "../components/HamburgerNavbar";
import IconAndTextListItem from "../components/IconAndTextListItem";

import mainIcon from '../assets/hexagons_Prosymbols_Premium.png';

import '../components/styles/card.css';
import '../components/styles/icon.css';

export default function StudentDashboardScreen() {

  const NAVBAR_TEXT = "Student Dashboard";
  
  const menuItems = [
    { url: "/students/progress", itemTitle: "Progress and Rewards" }, 
    { url: "/students/leaderboard", itemTitle: "Student Leaderboards" },
  ];

  const ICON_SIZE = "30px";
  const iconAndTextListItemStyle = {
		iconSize: {
			height: ICON_SIZE,
			width: ICON_SIZE
		},
    displayInline: true
	};

  const [pseudonym, setPseudonym] = React.useState("fake name");
  function handleInputChange(event) {
    setPseudonym(event.target.value);
    // TODO: save pseudonym
  }

  return (
    <>
      <HamburgerNavbar title={NAVBAR_TEXT} />
      <SideNavigationMenu />

      <div className="card">
        <h4>Pseudonym</h4>
        <input type="text" value={pseudonym} onChange={handleInputChange} style={{ borderWidth: '0px', borderBottomWidth: '1px', borderStyle: 'solid' }}/>
      </div>

      {menuItems.map(menuItem => 
        <div 
          key={menuItem.itemTitle}
          className="card">
          <Link 
            to={menuItem.url}>
            <IconAndTextListItem icon={mainIcon} text={menuItem.itemTitle} style={iconAndTextListItemStyle}/>  
            <span className="material-symbols-outlined">
              navigate_next
            </span>
          </Link> 
        </div>)}
    </>
  );
}