import { Link } from 'react-router-dom';

import HamburgerNavbar from "../components/HamburgerNavbar";
import IconAndTextListItem from "../components/IconAndTextListItem";
import SideNavigationMenu from "../components/SideNavigationMenu";

import mainIcon from '../assets/hexagons_Prosymbols_Premium.png';
import nextPageIcon from '../assets/next.png';

import '../components/styles/card.css';
import '../components/styles/icon.css';

function InstructorsAreaScreen() {

  const NEXT_PAGE_URL = "/managetracks";
  const NAVBAR_TEXT = "Instructors Area";
  const menuOptions = [
    "Manage Learning Tracks",
    "Manage Groups",
    "Leaderboards"
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
    <div>
      <HamburgerNavbar title={NAVBAR_TEXT} />
      <SideNavigationMenu />
      {menuOptions.map(menuOption => 
        <div 
          key={menuOption}
          className="card">
          <Link 
            to={NEXT_PAGE_URL}>
            <IconAndTextListItem icon={mainIcon} text={menuOption} style={iconAndTextListItemStyle}/>  
            <img src={nextPageIcon} alt="next page icon" className="icon--20px"/>
          </Link> 
        </div>)}
    </div>
  );
}

export default InstructorsAreaScreen;