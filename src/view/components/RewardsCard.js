import React from "react";
import PropTypes from 'prop-types';

import FontIconAndTextListItem from "./FontIconAndTextListItem";
import IconAndTextListItem from "./IconAndTextListItem";
import BadgeCard from "./BadgeCard";

import headingIcon from '../assets/hexagons_Prosymbols_Premium.png';

import './styles/card.css';
import { styles } from "./styles/commonDisplayStyles";
import * as constants from "../../modelsAndData/constants";

export default function RewardsCard({ mainIconSize, itemIconSize, badges }) {
  
  const {
    
  } = constants;

  const HEADING = "Badges";
  const MAIN_ICON_MARGIN_RIGHT = '10px';
  const BODY_TEXT_LEFT_INDENT = '43px';
  const BODY_TEXT_RIGHT_MARGIN = '30px';
  const FONT_ICON_AND_TEXT_SEPARATION = '10px';
  const DEFAULT_MARGIN = '10px';

  const TEXT_COLOR = styles.vDarkModeTextColor3;
  const LINE_COLOR = styles.vDarkModeTextColor1;

  const iconAndTextListItemStyle = {
		iconSize: {
			height: mainIconSize,
			width: mainIconSize
		}
	};

  const heading = 
    <FontIconAndTextListItem 
      spanFontIcon={{
        className: "material-symbols-outlined",
        content: "supervisor_account",
        style: {
          ...styles.mainIcon24pxFont,
          marginRight: FONT_ICON_AND_TEXT_SEPARATION
        }
      }}
      text={{
        content: HEADING,
        style: {
          color: TEXT_COLOR,
          ...styles.h3SizeAndWeight
        }
      }}
      containerStyle={{
        margin: DEFAULT_MARGIN,
        marginLeft: '0px'
      }}/>;

  return (
    <details className="card">

      <summary>{heading}</summary>

      {/* <hr/> */}

      {badges.map(badge => 
        <div key={badge.id}>
          <hr/>
          <BadgeCard 
            icon={headingIcon}
            iconSize={itemIconSize}
            name={badge.title}
            type={badge.type}
            criteria={badge.contentTitle}
            isComplete={false}/>
        </div>
      )}      

    </details>
  );
}

RewardsCard.propTypes = { 
  mainIconSize: PropTypes.string, 
  itemIconSize: PropTypes.string, 
  badges: PropTypes.array 
};

/* 
    <IconAndTextListItem 
          icon={headingIcon}
          text={HEADING}
          style={iconAndTextListItemStyle}/> 
*/