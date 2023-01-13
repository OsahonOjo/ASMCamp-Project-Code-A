import React from "react";
import PropTypes from 'prop-types';

import Tag from "./Tag";

import './styles/card.css';

function BadgeCard({ icon, iconSize, name, criteria, isComplete }) {

  const TAG_TEXT = "BADGE";
  const TAG_FONT_SIZE = "12px";
  const COMPLETE_TEXT = "Complete";
  const style = {
    width: iconSize,
    height: iconSize
  };

  return (
    <div className="child-card card-display--flex">

      <div>
        <img src={icon} style={style} alt="list item icon"/>
      </div>

      <div>
        <Tag 
          text={TAG_TEXT}
          displayBlock={true}
          fontSize={TAG_FONT_SIZE}/>
        <h4>{name}</h4>
        <p>{criteria}</p>
        {isComplete ? <p><i>{COMPLETE_TEXT}</i></p> : null}
      </div>

    </div>
  );
}

BadgeCard.propTypes = { 
  icon: PropTypes.string,
  iconSize: PropTypes.string, 
  name: PropTypes.string, 
  criteria: PropTypes.string, 
  isComplete: PropTypes.bool 
};

export default BadgeCard;