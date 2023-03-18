import React from "react";
import PropTypes from 'prop-types';

import Tag from "./Tag";
import IconAndTextListItem from "./IconAndTextListItem";
import FontIconAndTextListItem from "./FontIconAndTextListItem";
import CollapsibleParagraph from "./CollapsibleParagraph";

import mainCardIcon from '../assets/hexagons_Prosymbols_Premium.png';
import bulletIcon from "../assets/cell_Freepik.png";

import './styles/card.css';
import './styles/icon.css';
import { styles } from "./styles/commonDisplayStyles";
import { constants } from "../../modelsAndData/constants";

export default function CourseDetailsCard({ title, learningTrackTitle, longDescription, nHours, nXP, nLessons, nQuestions, userIsEnrolled }) {

  const TAG_TEXT = `${nXP ? nXP : 0} XP`;
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
  const LONG_DESC_CHAR_LIMIT = 160;
  const iconAndTextListItemStyle = {
		iconSize: {
			height: BULLET_ICON_SIZE,
			width: BULLET_ICON_SIZE
		}
	};

  const MAIN_ICON_MARGIN_RIGHT = '10px';
  const FONT_ICON_AND_TEXT_SEPARATION = '10px';
  const DEFAULT_MARGIN = '10px';
  const BODY_TEXT_RIGHT_MARGIN = '30px';

  const { PRIMARY_TEXT_COLOR_DARK } = constants;
  const TEXT_COLOR = PRIMARY_TEXT_COLOR_DARK;

  const buttonStyle = { 
    width: '150px', 
    height: '2em', 
    margin: DEFAULT_MARGIN,
    fontSize: '16px', 
    color: styles.vDarkModeTextColor3,
    backgroundColor: styles.vDarkModeBackground1,
    borderStyle: 'solid',
    borderColor: styles.vDarkModeTextColor3,
    borderWidth: '1px' 
  };

  const mainIcon = 
    <span style={{ marginRight: MAIN_ICON_MARGIN_RIGHT }}>
        <span className="material-symbols-outlined" style={styles.mainIcon24pxFont}>collections_bookmark</span>
    </span>;

  const xpTag = 
    <Tag 
      text={{
        content: TAG_TEXT,
        style: { 
          color: TEXT_COLOR,
          fontSize: TAG_FONT_SIZE
        }
      }} 
      container={{
        baseStyle: { 
          display: 'inline',
          borderWidth: TAG_BORDER_WIDTH,
          borderColor: TEXT_COLOR
        },
        otherStyle: {
          marginLeft: DEFAULT_MARGIN,
          padding: '0px',
          borderRadius: '5px'
        }
      }} />;

  const mainBody = 
    <div style={{ marginRight: BODY_TEXT_RIGHT_MARGIN }}>
      <div style={{ color: TEXT_COLOR, ...styles.h3SizeAndWeight, marginBottom: DEFAULT_MARGIN }}>{title}{xpTag}</div>
      
      <CollapsibleParagraph 
        text={longDescription} 
        limit={LONG_DESC_CHAR_LIMIT}
        paragraphStyle={{ color: TEXT_COLOR }} />
    </div>;

  const lessonCount = 
    <FontIconAndTextListItem 
      spanFontIcon={{
        className: "material-symbols-outlined",
        content: "collections_bookmark",
        style: {
          ...styles.listItemIcon14pxFont,
          marginRight: FONT_ICON_AND_TEXT_SEPARATION
        }
      }}
      text={{
        content: N_LESSONS_TEXT,
        style: {
          color: TEXT_COLOR,
        }
      }}
      containerStyle={{
        margin: DEFAULT_MARGIN
      }}/>;

  const questionCount = 
    <FontIconAndTextListItem 
      spanFontIcon={{
        className: "material-symbols-outlined",
        content: "collections_bookmark",
        style: {
          ...styles.listItemIcon14pxFont,
          marginRight: FONT_ICON_AND_TEXT_SEPARATION
        }
      }}
      text={{
        content: N_QUESTIONS_TEXT,
        style: {
          color: TEXT_COLOR,
        }
      }}
      containerStyle={{
        margin: DEFAULT_MARGIN
      }}/>;

  const startCourseButton = 
    <button 
      type="button" 
      style={buttonStyle}>
        {userIsEnrolled ? BUTTON_TEXT_RESUME : BUTTON_TEXT_BEGIN}
    </button>;

  return (
    <div className="card">

      <div style={styles.displayFlexRow}>
        {mainIcon}{mainBody}
      </div>

      <div style={{ textAlign: 'center' }}>
        {lessonCount}{questionCount}       
        {startCourseButton}
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

/*
  <IconAndTextListItem 
      icon={bulletIcon}
      text={LEARNING_TRACK_TEXT}
      style={iconAndTextListItemStyle}/>
*/