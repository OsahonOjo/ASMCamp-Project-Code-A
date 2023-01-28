import React from "react";
import PropTypes from 'prop-types';

import Tag from "./Tag";
import IconAndTextListItem from "./IconAndTextListItem";
import CollapsibleParagraph from "./CollapsibleParagraph";

import mainCardIcon from '../assets/hexagons_Prosymbols_Premium.png';
import bulletIcon from "../assets/cell_Freepik.png";

import './styles/card.css';
import './styles/icon.css';
import { commonDisplayStyles } from "./styles/commonDisplayStyles";

function LearningTrackDetailsCard({ title, longDescription, nHours, nCourses, userIsEnrolled }) {

  const LONG_DESC_CHAR_LIMIT = 300;
  const TAG_TEXT = "ENROLLED";
  const TAG_BORDER_WIDTH = "1px";
  const TAG_BORDER_COLOR = "black";
  const TAG_FONT_SIZE = "20px";
  const TAG_DISPLAY_BLOCK = true;
  const BUTTON_TEXT_ENROLL = "Enroll";
  const BUTTON_TEXT_RESUME = "Resume Track";
  const N_HOURS_TEXT = `${nHours} Hours`;
  const N_COURSES_TEXT = `${nCourses} Courses`;
  const BULLET_ICON_SIZE = "10px";
  const iconAndTextListItemStyle = {
		iconSize: {
			height: BULLET_ICON_SIZE,
			width: BULLET_ICON_SIZE
		}
	};

  return (
    <div className="card" style={commonDisplayStyles.displayFlex}>

      <div>
        <i className="fa fa-road" style={commonDisplayStyles.icon24Style}></i>
      </div>

      <div>
        
        <h4>{title}</h4>
        {userIsEnrolled ? <Tag text={TAG_TEXT} displayBlock={TAG_DISPLAY_BLOCK} borderWidth={TAG_BORDER_WIDTH} borderColor={TAG_BORDER_COLOR} fontSize={TAG_FONT_SIZE}/> : null}

        <CollapsibleParagraph text={longDescription} limit={LONG_DESC_CHAR_LIMIT} />

        <div style={commonDisplayStyles.displayFlexCenter}>

          <IconAndTextListItem 
            icon={bulletIcon}
            text={N_HOURS_TEXT}
            style={iconAndTextListItemStyle}/>

          <IconAndTextListItem 
            icon={bulletIcon}
            text={N_COURSES_TEXT}
            style={iconAndTextListItemStyle}/>

        </div>

        <button type="button">{userIsEnrolled ? BUTTON_TEXT_RESUME : BUTTON_TEXT_ENROLL}</button>

      </div>

    </div>
  );
}

LearningTrackDetailsCard.propTypes = {
  title: PropTypes.string,
  longDescription: PropTypes.string,
  nHours: PropTypes.number,
  nCourses: PropTypes.number,
  userIsEnrolled: PropTypes.bool
};

export default LearningTrackDetailsCard;