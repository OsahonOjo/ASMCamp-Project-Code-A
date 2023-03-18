import React from "react";
import { Link, useLocation } from 'react-router-dom';

import ProgressBar from "./ProgressBar";
import CollapsibleParagraph from './CollapsibleParagraph';

import './styles/card.css';
import { styles } from "./styles/commonDisplayStyles";
import { constants } from "../../modelsAndData/constants";

interface LearningTrackSummaryCardProps {
  trackDetails: {
    trackId: string,
    title: string,
    shortDescription: string,
    longDescription: string,
    nCourses: number
  },
  userIsEnrolled: boolean,
  progressBar: {
    percentage: number,
    hasLabel: boolean,
    labelOnRightSide: boolean
  },
  editMode?: boolean,
  to: string
};

export default function LearningTrackSummaryCard({ trackDetails, userIsEnrolled, progressBar, editMode, to }: LearningTrackSummaryCardProps): JSX.Element {

  // this component has two modes: view mode, edit mode

  const MAIN_ICON_MARGIN_RIGHT = '10px';
  const BODY_TEXT_LEFT_INDENT = '45px';
  const BODY_TEXT_RIGHT_MARGIN = '30px';
  const PROGRESS_BAR_PADDING_BOTTOM = '20px';

  const { PRIMARY_TEXT_COLOR_DARK } = constants;

  const TEXT_COLOR = PRIMARY_TEXT_COLOR_DARK;

  const viewModeLinkIconMargins = {
    marginTop: '-5px',
    marginRight: '-10px'
  };

  const editModeLinkIconMargins = {
    marginTop: '-5px',
    marginRight: '-10px'
  };

  const location = useLocation();

  const mainIcon = 
    <span style={{ marginRight: MAIN_ICON_MARGIN_RIGHT }}>
      <i className="fa fa-road" style={styles.mainIcon24pxFont}></i>
    </span>;

  const heading = 
    <Link 
      to={to}
      state={{ from: location.pathname, payload: trackDetails }}
      style={{ color: TEXT_COLOR, flexGrow: 9 }}>
        <p style={styles.h3SizeAndWeight}>
          {trackDetails.title}
        </p>
    </Link>;

  const linkIcon = 
    <Link 
      to={to}
      state={{ from: location.pathname, payload: trackDetails }}
      style={{ color: TEXT_COLOR, ...styles.paddingMarginZero }}>
        {
          editMode 
            ? <span className="material-symbols-outlined" style={{ ...styles.icon30pxFont }}>
                edit
              </span>
            : <span className="material-symbols-outlined" style={{ ...styles.icon40pxFont, ...viewModeLinkIconMargins }}>
                navigate_next
              </span>
        }
    </Link>;

  const progress = 
    userIsEnrolled 
      ? <div style={{ paddingBottom: PROGRESS_BAR_PADDING_BOTTOM }}>
          <ProgressBar 
            percentage={progressBar.percentage} 
            hasLabel={progressBar.hasLabel} 
            labelOnRightSide={progressBar.labelOnRightSide}/> 
        </div>
      : null;

  const bodyText = 
    <CollapsibleParagraph 
      text={trackDetails.shortDescription}
      paragraphStyle={{ color: TEXT_COLOR, marginRight: BODY_TEXT_RIGHT_MARGIN }} />;

  return (
    <div className="card">

      {/* style={{ ...styles.displayFlex }} causes error for this <div>*/}
      <div className="card-display--flex">
        {mainIcon}{heading}{linkIcon}
      </div>

      <div style={{ marginLeft: BODY_TEXT_LEFT_INDENT, flexGrow: 9 }}>
        {userIsEnrolled ? progress : null}
        {bodyText}
      </div>
      
    </div>
  );
}

/*
  // import nextPageIcon from '../assets/next.png';
  // import editIcon from '../assets/pen_alkhalifi_design.png';

  const TAG_TEXT = "ENROLLED";
  const TAG_BORDER_WIDTH = "1px";
  const TAG_BORDER_COLOR = "black";
  const TAG_FONT_SIZE = "20px";
  const TAG_DISPLAY_BLOCK = true;

  {
    userIsEnrolled 
      ? <Tag text={TAG_TEXT} displayBlock={TAG_DISPLAY_BLOCK} borderWidth={TAG_BORDER_WIDTH} borderColor={TAG_BORDER_COLOR} fontSize={TAG_FONT_SIZE}/> 
      : null
  }
*/