import React from "react";
import PropTypes from 'prop-types';

import IconAndTextListItem from "./IconAndTextListItem";
import BadgeCard from "./BadgeCard";

import headingIcon from '../assets/hexagons_Prosymbols_Premium.png';

import './styles/card.css';

function RewardsCard({ mainIconSize, itemIconSize, badges }) {

  const HEADING = "Rewards";
  const iconAndTextListItemStyle = {
		iconSize: {
			height: mainIconSize,
			width: mainIconSize
		}
	};

  return (
    <details open className="card">

      <summary>
        <IconAndTextListItem 
          icon={headingIcon}
          text={HEADING}
          style={iconAndTextListItemStyle}/>
      </summary>

      {badges.map(badge => 
        <BadgeCard 
          key={badge.id}
          icon={headingIcon}
          iconSize={itemIconSize}
          name={badge.title}
          type={badge.type}
          criteria={badge.contentTitle}
          isComplete={false}/>
      )}      

    </details>
  );
}

RewardsCard.propTypes = { 
  mainIconSize: PropTypes.string, 
  itemIconSize: PropTypes.string, 
  badges: PropTypes.array 
};

export default RewardsCard;