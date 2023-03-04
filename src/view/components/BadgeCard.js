import React from "react";
import PropTypes from 'prop-types';

import { badgeTypes } from "../../model/enums";

import Tag from "./Tag";

import './styles/card.css';

function BadgeCard({ icon, iconSize, name, type, criteria, isComplete, displayInline }) {

  const TAG_TEXT_BADGE = "BADGE";
  const TAG_TEXT_COMPLETE = "COMPLETE";
  const TAG_FONT_SIZE = "14px";
  const COMPLETE_TEXT = "Complete";
  let typeText = "";
  const style = {
    width: iconSize,
    height: iconSize,
    backgroundColor: '#add8e6',
    borderRadius: '50%'
  };

  // {type && type == badgeTypes.TPITM.typeId ? "Topic Item" : null}
  // {type && type == badgeTypes.TOPIC.typeId ? "Topic" : null}
  // {type && type == badgeTypes.COURS.typeId ? "Course" : null}
  // {type && type == badgeTypes.TRACK.typeId ? "Learning Track" : null}

  switch(type) {
    case badgeTypes.TPITM.typeId:
      typeText = "Topic Item";
      break;
    case badgeTypes.TOPIC.typeId:
      typeText = "Topic";
      break;
    case badgeTypes.COURS.typeId:
      typeText = "Course";
      break;
    case badgeTypes.TRACK.typeId:
      typeText = "Learning Track";
      break;
  }

  return (
    <div className="card-display--flex">

      <div>
        <img src={icon} style={style} alt="list item icon"/>
      </div>

      <div>
        <Tag text={TAG_TEXT_BADGE} displayBlock={true} fontSize={TAG_FONT_SIZE}/> 
        <p style={{ fontSize: '30px' }}>{name}</p>
        <Tag text={TAG_TEXT_COMPLETE} displayBlock={false} fontSize={TAG_FONT_SIZE} borderWidth={'1px'} borderColor={style.backgroundColor}/> 

        <p>
          <span>{criteria}</span>
          <br/>
          <span style={{ fontSize: '16px' }}>
            <i>{typeText}</i>
          </span>
        </p>
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