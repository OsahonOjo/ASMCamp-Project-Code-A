import React from "react";
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import ProgressBar from "./ProgressBar";
import IconAndTextListItem from "./IconAndTextListItem";
import CollapsibleParagraph from "./CollapsibleParagraph";

import mainCardIcon from '../assets/hexagons_Prosymbols_Premium.png';
import nextPageIcon from '../assets/next.png';
import bulletIcon from "../assets/cell_Freepik.png";

import './styles/card.css';
import './styles/icon.css';
import { styles } from "./styles/commonDisplayStyles";

/*
  let slug = title.toLowerCase().replace(/ /g, "-");
  const url = "/tracks/" + slug;
*/

export default function CourseSummaryCard({ courseId, learningTrackId, title, shortDescription, nHours, userIsEnrolled, percentage, hasLabel, labelOnRightSide, editMode, nextPageUrl }) {

  // this component has two modes: view mode, edit mode

  const location = useLocation();

  const NORMAL_MODE_NEXT_PAGE_URL = `/course/${courseId}`;
  const EDIT_MODE_NEXT_PAGE_URL = `/instructors/edit/course`;
  const NEXT_PAGE_URL = editMode ? EDIT_MODE_NEXT_PAGE_URL : NORMAL_MODE_NEXT_PAGE_URL;
  // const NEXT_PAGE_URL = location.pathname + NEXT_PAGE_URL_SUFFIX;
  const N_HOURS_TEXT = `${nHours} Hours`;
  const BULLET_ICON_SIZE = "10px";
  const SHORT_DESC_CHAR_LIMIT = 80;

  const TEXT_COLOR = styles.vDarkModeTextColor3;
  const LINE_COLOR = styles.vDarkModeTextColor1;

  const MAIN_ICON_MARGIN_RIGHT = '10px';
  const BODY_TEXT_LEFT_INDENT = '43px';
  const BODY_TEXT_RIGHT_MARGIN = '30px';
  const PROGRESS_BAR_PADDING_BOTTOM = '20px';

  const iconAndTextListItemStyle = {
		iconSize: {
			height: BULLET_ICON_SIZE,
			width: BULLET_ICON_SIZE
		}
	};

  const viewModeLinkIconMargins = {
    marginTop: '-3px',
    marginRight: '-7px'
  };

  const mainIcon = 
    <div style={{ marginRight: MAIN_ICON_MARGIN_RIGHT }}>
      <span className="material-symbols-outlined" style={styles.mainIcon24pxFont}>collections_bookmark</span>
    </div>;

  const heading = 
    <Link 
      to={nextPageUrl} 
      style={{ color: TEXT_COLOR, flexGrow: 9 }}>
        <p style={{ ...styles.h4SizeAndWeight }}>{title}</p>
    </Link>;

  const linkIcon = 
    <Link 
      to={nextPageUrl}
      style={{ color: TEXT_COLOR }}>
        <div>
          {
            editMode 
            ? <span className="material-symbols-outlined" style={{ ...styles.icon30pxFont }}>
                edit
              </span>
            : <span className="material-symbols-outlined" style={{ ...styles.icon35pxFont, ...viewModeLinkIconMargins }}>
                navigate_next
              </span>
          }
        </div>
    </Link>;

  const progress = 
    <div style={{ paddingBottom: PROGRESS_BAR_PADDING_BOTTOM }}>
      <ProgressBar 
        percentage={percentage}
        hasLabel={hasLabel}
        labelOnRightSide={labelOnRightSide}/> 
    </div>;

  const bodyText = 
    <div style={{ color: TEXT_COLOR }}> 
      <CollapsibleParagraph 
        text={shortDescription} 
        limit={SHORT_DESC_CHAR_LIMIT}
        paragraphStyle={{ marginRight: BODY_TEXT_RIGHT_MARGIN }} />
      <br/>
    </div>;

  return (
    <div>

        <hr style={{ borderColor: LINE_COLOR }}/>

        <div style={{ ...styles.displayFlexRow }}>
          {mainIcon}{heading}{linkIcon}
        </div>

        <div style={{ marginLeft: BODY_TEXT_LEFT_INDENT, flexGrow: 9 }}>
          {userIsEnrolled ? progress : null}  
          {bodyText}
        </div>

    </div>
  );
}

CourseSummaryCard.propTypes = {
  title: PropTypes.string,
  shortDescription: PropTypes.string,
  userIsEnrolled: PropTypes.bool,
  percentage: PropTypes.number
};

// state={{ from: location.pathname, learningTrackId: learningTrackId }}
/*
  <IconAndTextListItem 
            icon={bulletIcon}
            text={N_HOURS_TEXT}
            style={iconAndTextListItemStyle}/>
 */