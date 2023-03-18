import React from "react";
import PropTypes from 'prop-types';

import { badgeTypes } from "../../modelsAndData/enums";

import Tag from "./Tag";

import './styles/card.css'; 
import { styles } from "./styles/commonDisplayStyles";
import { constants } from "../../modelsAndData/constants";

function BadgeCard({ icon, iconSize, name, type, criteria, isComplete, displayInline }) {

  const TAG_TEXT_BADGE = "BADGE";
  const TAG_TEXT_COMPLETE = "COMPLETE";
  const TAG_FONT_SIZE = "14px";
  const COMPLETE_TEXT = "Complete";
  const MAIN_ICON_MARGIN_RIGHT = '10px';

  const { PRIMARY_TEXT_COLOR_DARK } = constants;
  const TEXT_COLOR = PRIMARY_TEXT_COLOR_DARK;
  let typeText = "";
  const style = {
    width: iconSize,
    height: iconSize,
    backgroundColor: '#add8e6',
    borderRadius: '50%'
  };

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

  const badgeLabelTag = 
    <Tag 
      text={{
        content: TAG_TEXT_BADGE,
        style: { 
          color: TEXT_COLOR,
          fontSize: TAG_FONT_SIZE
        }
      }} 
      container={{
        baseStyle: { display: 'block' }
      }} />;

  const badgeIsCompleteTag = 
    <Tag 
      text={{
        content: TAG_TEXT_COMPLETE,
        style: { 
          color: TEXT_COLOR,
          fontSize: TAG_FONT_SIZE
        }
      }} 
      container={{
        baseStyle: { 
          borderWidth: '1px',
          borderColor: TEXT_COLOR
        },
        otherStyle: {
          padding: '3px'
        }
      }} />;

  return (
    <div className="card-display--flex">

      <div style={{ marginRight: MAIN_ICON_MARGIN_RIGHT }}>
        <span className="material-symbols-outlined" style={{ ...styles.mainIcon36pxFont }}>
          token
        </span>
      </div>

      <div style={{ color: TEXT_COLOR }}>
        
        {badgeLabelTag}
        <p style={{ fontSize: '30px' }}>{name}</p>
        {badgeIsCompleteTag}

        <p>
          <br/>
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