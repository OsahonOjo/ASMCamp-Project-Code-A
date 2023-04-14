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

export default function LearningTrackDetailsCard({ title, longDescription, nHours, nCourses, userIsEnrolled }) {
 
  const LONG_DESC_CHAR_LIMIT = 160;
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

  const MAIN_ICON_MARGIN_RIGHT = '10px';
  const FONT_ICON_AND_TEXT_SEPARATION = '10px';
  const DEFAULT_MARGIN = '10px';
  const BODY_TEXT_RIGHT_MARGIN = '30px';

  const TEXT_COLOR = styles.vDarkModeTextColor3;

  const iconAndTextListItemStyle = {
		iconSize: {
			height: BULLET_ICON_SIZE,
			width: BULLET_ICON_SIZE
		},
    separation: '10px'
	};

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
    <span style={{ marginRight: MAIN_ICON_MARGIN_RIGHT  }}>
        <span className="material-symbols-outlined" style={styles.mainIcon24pxFont}>
        conversion_path
      </span>
    </span>;
    // <span style={{ marginRight: MAIN_ICON_MARGIN_RIGHT }}>
    //   <i className="fa fa-road" style={{ ...styles.mainIcon24pxFont }}></i>
    // </span>;

  const mainBody = 
    <div style={{ marginRight: BODY_TEXT_RIGHT_MARGIN }}>
      <p style={{ color: TEXT_COLOR, ...styles.h3SizeAndWeight }}>{title}</p>
      <CollapsibleParagraph 
        text={longDescription} 
        limit={LONG_DESC_CHAR_LIMIT}
        paragraphStyle={{ color: TEXT_COLOR }} />
    </div>;

  const courseCount = 
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
        content: N_COURSES_TEXT,
        style: {
          color: TEXT_COLOR,
        }
      }}
      containerStyle={{
        margin: DEFAULT_MARGIN
      }}/>;

  const enrollButton = 
    <button 
      type="button" 
      style={buttonStyle}>
      {userIsEnrolled ? BUTTON_TEXT_RESUME : BUTTON_TEXT_ENROLL}
    </button>;

  return (
    <div className="card">

      <div style={{ ...styles.displayFlexRow, marginTop: DEFAULT_MARGIN }}>
        {mainIcon}{mainBody}
      </div>

      <div style={{ textAlign: 'center' }}>
        {courseCount}       
        {enrollButton}
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

/*
    {userIsEnrolled ? <Tag text={TAG_TEXT} displayBlock={TAG_DISPLAY_BLOCK} borderWidth={TAG_BORDER_WIDTH} borderColor={TAG_BORDER_COLOR} fontSize={TAG_FONT_SIZE}/> : null}
 
    <IconAndTextListItem 
      icon={bulletIcon}
      text={N_COURSES_TEXT}
      style={iconAndTextListItemStyle}/>
 
*/