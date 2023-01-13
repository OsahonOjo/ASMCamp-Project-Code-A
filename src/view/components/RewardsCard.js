import React from "react";
import PropTypes from 'prop-types';

import IconAndTextListItem from "./IconAndTextListItem";
import BadgeCard from "./BadgeCard";

import headingIcon from '../assets/hexagons_Prosymbols_Premium.png';

import './styles/card.css';

function RewardsCard({ mainIconSize, itemIconSize, rewards }) {

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

      {rewards.map(reward => 
        <BadgeCard 
          key={reward.name}
          icon={headingIcon}
          iconSize={itemIconSize}
          name={reward.name}
          criteria={reward.criteria}
          isComplete={reward.isComplete}/>
      )}      

    </details>
  );
}

RewardsCard.propTypes = { 
  mainIconSize: PropTypes.string, 
  itemIconSize: PropTypes.string, 
  rewards: PropTypes.array 
};

export default RewardsCard;