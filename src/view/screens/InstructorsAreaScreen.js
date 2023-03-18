import { Link } from 'react-router-dom';

import HamburgerNavbar from "../components/HamburgerNavbar";
import IconAndTextListItem from "../components/IconAndTextListItem";
import FontIconAndTextListItem from "../components/FontIconAndTextListItem";
import SideNavigationMenu from "../components/SideNavigationMenu";
import ReactExecutionTextComponent from './Temp';

import mainIcon from '../assets/hexagons_Prosymbols_Premium.png';
import nextPageIcon from '../assets/next.png';

import '../components/styles/card.css';
import '../components/styles/icon.css';
import { styles } from '../components/styles/commonDisplayStyles'; 

import { constants } from '../../modelsAndData/constants';

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

  const { PRIMARY_TEXT_COLOR_DARK, SECONDARY_BACKGROUND_COLOR_DARK } = constants;
  const TEXT_COLOR = PRIMARY_TEXT_COLOR_DARK;
  const DEFAULT_MARGIN = '10px';
  const DEFAULT_PADDING = '10px';
  const FONT_ICON_AND_TEXT_SEPARATION = '10px';

  return (
    <>
      <HamburgerNavbar title={NAVBAR_TEXT} />
      <SideNavigationMenu />

      <div 
        key={menuItems[0].itemTitle}
        className="card">
          <Link 
            to={menuItems[0].url}>
              {/* <IconAndTextListItem icon={mainIcon} text={menuItems[0].itemTitle} style={iconAndTextListItemStyle}/>   */}
              <FontIconAndTextListItem 
                iFontIcon={{
                  className: "fa fa-road",
                  style: {
                    ...styles.mainIcon24pxFont,
                    marginRight: FONT_ICON_AND_TEXT_SEPARATION,
                    color: '#444'
                  }
                }}
                text={{
                  content: menuItems[0].itemTitle,
                  style: {
                    color: TEXT_COLOR,
                  }
                }}
                containerStyle={{
                  // padding: DEFAULT_PADDING,
                  display: 'inline'
                }}/>
              {/* <img src={nextPageIcon} alt="next page icon" className="icon--20px"/> */}
          </Link> 
      </div>

    </>
  );
}

export default InstructorsAreaScreen;