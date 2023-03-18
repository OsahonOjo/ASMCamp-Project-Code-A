import React from "react";
import { Link } from "react-router-dom";

import SideNavigationMenu from "../components/SideNavigationMenu";
import HamburgerNavbar from "../components/HamburgerNavbar";
import IconAndTextListItem from "../components/IconAndTextListItem";
import FontIconAndTextListItem from "../components/FontIconAndTextListItem";

import mainIcon from '../assets/hexagons_Prosymbols_Premium.png';

import '../components/styles/card.css';
import '../components/styles/icon.css';
import { styles } from "../components/styles/commonDisplayStyles";

import { constants } from "../../modelsAndData/constants";

export default function StudentDashboardScreen() {

  const NAVBAR_TEXT = "Student Dashboard";
  
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
  const FONT_ICON_AND_TEXT_SEPARATION = '10px';

  const inputStyle = { 
    height: '1.15em', 
    width: '90%', 
    borderWidth: '0px', 
    marginBottom: '15px', 
    marginTop: DEFAULT_MARGIN, 
    borderBottomWidth: '1px', 
    borderColor: TEXT_COLOR, 
    backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, 
    color: TEXT_COLOR,
    fontSize: '18px',
  };

  const [pseudonym, setPseudonym] = React.useState("pseudonym");
  function handleInputChange(event) {
    setPseudonym(event.target.value);
    // TODO: save pseudonym
  }

  // <i className="fa fa-tachometer" style={{ ...styles.mainIcon24pxFont, marginRight: MAIN_ICON_MARGIN_RIGHT }}></i>

  return (
    <>
      <HamburgerNavbar title={NAVBAR_TEXT} />
      <SideNavigationMenu />

      <div className="card">
        <h4 style={{ color: TEXT_COLOR }}>Pseudonym</h4>
        <input 
          type="text" 
          value={pseudonym} 
          onChange={handleInputChange} 
          style={inputStyle}/>
      </div>

      <div 
        key={"Progress and Rewards"}
        className="card"
        style={{ padding: '15px' }}>
          <Link 
            to={"/students/progress"}>
            {/* <IconAndTextListItem icon={mainIcon} text={"Progress and Rewards"} style={iconAndTextListItemStyle}/>   */}
              <FontIconAndTextListItem 
                iFontIcon={{
                  className: "fa fa-tachometer",
                  style: {
                    ...styles.mainIcon24pxFont,
                    marginRight: FONT_ICON_AND_TEXT_SEPARATION,
                    color: '#444'
                  }
                }}
                text={{
                  content: "Progress and Rewards",
                  style: {
                    color: TEXT_COLOR,
                  }
                }}
                containerStyle={{
                  // margin: DEFAULT_MARGIN,
                  display: 'inline'
                }}/>
              {/* <span 
                className="material-symbols-outlined"
                style={{ color: TEXT_COLOR, fontSize: '36px' }}>
                navigate_next
              </span> */}
          </Link> 
      </div>

      {/* <div 
        key={"Leaderboards"}
        className="card">
        <Link 
          to={"/students/leaderboards"}>
          <IconAndTextListItem icon={mainIcon} text={"Leaderboards"} style={iconAndTextListItemStyle}/>  
          <span className="material-symbols-outlined">
            navigate_next
          </span>
        </Link> 
      </div> */}
    </>
  );
}