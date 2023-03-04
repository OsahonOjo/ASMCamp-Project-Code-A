import { Link } from 'react-router-dom';

import HamburgerNavbar from "../components/HamburgerNavbar";
import IconAndTextListItem from "../components/IconAndTextListItem";
import SideNavigationMenu from "../components/SideNavigationMenu";
import Temp from './Temp';

import mainIcon from '../assets/hexagons_Prosymbols_Premium.png';
import nextPageIcon from '../assets/next.png';

import '../components/styles/card.css';
import '../components/styles/icon.css';

function InstructorsAreaScreen() {

  const NAVBAR_TEXT = "Instructors Area";
  const menuItems = [
    { url: "/instructors/tracks", itemTitle: "Manage Learning Tracks" }, 
    { url: "/instructors/groups", itemTitle: "Manage Groups" },
    { url: "/instructors/leaderboards", itemTitle: "Leaderboards" }
  ];
  const ICON_SIZE = "30px";
  const iconAndTextListItemStyle = {
		iconSize: {
			height: ICON_SIZE,
			width: ICON_SIZE
		},
    displayInline: true
	};

  return (
    <>
      <HamburgerNavbar title={NAVBAR_TEXT} />
      <SideNavigationMenu />
      <Link to={"/instructors/temp"}>Click to go to Temp</Link>
      {menuItems.map(menuItem => 
        <div 
          key={menuItem.itemTitle}
          className="card">
            <Link 
              to={menuItem.url}>
                <IconAndTextListItem icon={mainIcon} text={menuItem.itemTitle} style={iconAndTextListItemStyle}/>  
                <img src={nextPageIcon} alt="next page icon" className="icon--20px"/>
            </Link> 
        </div>
      )}
    </>
  );
}

export default InstructorsAreaScreen;