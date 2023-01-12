import React from "react";
import PropTypes from 'prop-types';

import Tag from "./Tag";
import IconAndTextListItem from "./IconAndTextListItem";

import mainCardIcon from '../assets/hexagons_Prosymbols_Premium.png';
import bulletIcon from "../assets/cell_Freepik.png";

import './styles/card.css';
import './styles/icon.css';
import { commonDisplayStyles } from "./styles/commonDisplayStyles";

function LearningTrackDetailsCard({ title, description, nHours, nCourses, userIsEnrolled }) {

  const TAG_TEXT = "ENROLLED";
  const TAG_BORDER_WIDTH = "1px";
  const TAG_BORDER_COLOR = "black";
  const TAG_FONT_SIZE = "20px";
  const TAG_DISPLAY_BLOCK = true;
  const BUTTON_TEXT_ENROLL = "Enroll";
  const BUTTON_TEXT_RESUME = "Resume Track";
  const BULLET_ICON_SIZE = "10px";
  const N_HOURS_TEXT = `${nHours} Hours`;
  const N_COURSES_TEXT = `${nCourses} Courses`;

  return (
    <div className="card" style={commonDisplayStyles.displayFlex}>

      <div>
        <img src={mainCardIcon} alt="main card icon" className="icon--30px"/>
      </div>

      <div>
        
        <h4>{title}</h4>
        {userIsEnrolled ? <Tag text={TAG_TEXT} displayBlock={TAG_DISPLAY_BLOCK} borderWidth={TAG_BORDER_WIDTH} borderColor={TAG_BORDER_COLOR} fontSize={TAG_FONT_SIZE}/> : null}

        <div>
          <p>{description}</p>
        </div>

        <div style={commonDisplayStyles.displayFlexCenter}>

          <IconAndTextListItem 
            icon={bulletIcon}
            iconSize={BULLET_ICON_SIZE}
            text={N_HOURS_TEXT}/>

          <IconAndTextListItem 
            icon={bulletIcon}
            iconSize={BULLET_ICON_SIZE}
            text={N_COURSES_TEXT}/>

        </div>

        <button type="button">{userIsEnrolled ? BUTTON_TEXT_RESUME : BUTTON_TEXT_ENROLL}</button>

      </div>

    </div>
  );
}

LearningTrackDetailsCard.propTypes = {
  title: PropTypes.string,
  shortDescription: PropTypes.string,
  nHours: PropTypes.number,
  nCourses: PropTypes.number,
  userIsEnrolled: PropTypes.bool
};

export default LearningTrackDetailsCard;