import React from "react";
import PropTypes from 'prop-types';

import Tag from "./Tag";
import IconAndTextListItem from "./IconAndTextListItem";

import mainCardIcon from '../assets/hexagons_Prosymbols_Premium.png';
import bulletIcon from "../assets/cell_Freepik.png";

import './styles/card.css';
import './styles/icon.css';
import { commonDisplayStyles } from "./styles/commonDisplayStyles";

function CourseDetailsCard({ title, learningTrackTitle, longDescription, nHours, nXP, nLessons, nQuestions, userIsEnrolled }) {

  const TAG_TEXT = `${nXP} XP`;
  const TAG_BORDER_WIDTH = "1px";
  const TAG_BORDER_COLOR = "black";
  const TAG_FONT_SIZE = "20px";
  const TAG_DISPLAY_BLOCK = true;
  const BUTTON_TEXT_BEGIN = "Begin Course";
  const BUTTON_TEXT_RESUME = "Resume Course";
  const N_HOURS_TEXT = `${nHours} Hours`;
  const N_LESSONS_TEXT = `${nLessons} Lessons`;
  const N_QUESTIONS_TEXT = `${nQuestions} Questions`;
  const LEARNING_TRACK_TEXT = `Part of ${learningTrackTitle}`;
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
        <img src={mainCardIcon} alt="main card icon" className="icon--30px"/>
      </div>

      <div>
        
        <h4>{title}</h4>
        <Tag text={TAG_TEXT} displayBlock={TAG_DISPLAY_BLOCK} borderWidth={TAG_BORDER_WIDTH} borderColor={TAG_BORDER_COLOR} fontSize={TAG_FONT_SIZE}/>

        <IconAndTextListItem 
            icon={bulletIcon}
            text={LEARNING_TRACK_TEXT}
            style={iconAndTextListItemStyle}/>

        <p>{longDescription}</p>

        <div style={commonDisplayStyles.displayFlexCenter}>

          <IconAndTextListItem 
            icon={bulletIcon}
            text={N_HOURS_TEXT}
            style={iconAndTextListItemStyle}/>

          <IconAndTextListItem 
            icon={bulletIcon}
            text={N_LESSONS_TEXT}
            style={iconAndTextListItemStyle}/>

          <IconAndTextListItem 
            icon={bulletIcon}
            text={N_QUESTIONS_TEXT}
            style={iconAndTextListItemStyle}/>

        </div>

        <button type="button">{userIsEnrolled ? BUTTON_TEXT_RESUME : BUTTON_TEXT_BEGIN}</button>

      </div>

    </div>
  );
}

CourseDetailsCard.propTypes = {
  title: PropTypes.string,
  learningTrackTitle: PropTypes.string,
  longDescription: PropTypes.string,
  nHours: PropTypes.number,
  nXP: PropTypes.number,
  nLessons: PropTypes.number,
  nQuestions: PropTypes.number,
  userIsEnrolled: PropTypes.bool
};

export default CourseDetailsCard;