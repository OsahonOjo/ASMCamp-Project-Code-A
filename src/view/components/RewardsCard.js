import React from "react";
import PropTypes from 'prop-types';

import IconAndTextListItem from "./IconAndTextListItem";

import headingIcon from '../assets/hexagons_Prosymbols_Premium.png';

import './styles/card.css';
import { commonDisplayStyles } from "./styles/commonDisplayStyles";

function RewardsCard({ mainIconSize, itemIconSize, rewards }) {

  const HEADING = "Rewards";

  return (
    <details open className="card">

      <summary>
        <IconAndTextListItem 
          icon={headingIcon}
          iconSize={mainIconSize}
          text={HEADING}/>
      </summary>

      

    </details>
  );
}

RewardsCard.propTypes = { 
  mainIconSize: PropTypes.string, 
  itemIconSize: PropTypes.string, 
  rewards: PropTypes.array 
};

export default RewardsCard;