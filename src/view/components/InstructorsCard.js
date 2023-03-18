import React from "react";
import PropTypes from 'prop-types';

import FontIconAndTextListItem from "./FontIconAndTextListItem";

import headingIcon from '../assets/hexagons_Prosymbols_Premium.png';

import './styles/card.css';
import { styles } from "./styles/commonDisplayStyles";

export default function InstructorsCard({ mainIconSize, itemIconSize, instructors }) {

  const HEADING = "Instructors";

  const TEXT_COLOR = styles.vDarkModeTextColor3;
  const LINE_COLOR = styles.vDarkModeTextColor1;

  const MAIN_ICON_MARGIN_RIGHT = '10px';
  const BODY_TEXT_LEFT_INDENT = '43px';
  const BODY_TEXT_RIGHT_MARGIN = '30px';
  const FONT_ICON_AND_TEXT_SEPARATION = '10px';
  const DEFAULT_MARGIN = '10px';

  const iconAndTextListItemStyleMain = {
		iconSize: {
			height: mainIconSize,
			width: mainIconSize
		}
	};
  const iconAndTextListItemStyleItem = {
		iconSize: {
			height: itemIconSize,
			width: itemIconSize
		}
	};

  const heading = 
    <FontIconAndTextListItem 
      spanFontIcon={{
        className: "material-symbols-outlined",
        content: "supervisor_account",
        style: {
          ...styles.mainIcon24pxFont,
          marginRight: FONT_ICON_AND_TEXT_SEPARATION
        }
      }}
      text={{
        content: HEADING,
        style: {
          color: TEXT_COLOR,
          ...styles.h3SizeAndWeight
        }
      }}
      containerStyle={{
        margin: DEFAULT_MARGIN,
        marginLeft: '0px'
      }}/>;

  return (
    <details className="card">

      <summary>{heading}</summary>

      <hr style={{ borderColor: LINE_COLOR }}/>

      <div style={styles.indented}>
        {instructors.map(instructor => 
          <FontIconAndTextListItem 
            key={instructor.name}
            spanFontIcon={{
              className: "material-symbols-outlined",
              content: "person",
              style: {
                ...styles.mainIcon24pxFont,
                marginRight: FONT_ICON_AND_TEXT_SEPARATION
              }
            }}
            text={{
              content: instructor.name,
              style: {
                color: TEXT_COLOR,
              }
            }}
            containerStyle={{
              margin: DEFAULT_MARGIN,
              marginLeft: '0px'
            }}/>)}
      </div>

    </details>
  );
}

InstructorsCard.propTypes = { 
  mainIconSize: PropTypes.string, 
  itemIconSize: PropTypes.string, 
  instructors: PropTypes.array 
};

/*
    <IconAndTextListItem 
      icon={headingIcon}
      text={HEADING}
      style={iconAndTextListItemStyleMain}/>
*/