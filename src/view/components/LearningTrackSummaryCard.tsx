import React from "react";
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import ProgressBar from "./ProgressBar";
import Tag from "./Tag";
import CollapsibleParagraph from './CollapsibleParagraph';

// import nextPageIcon from '../assets/next.png';
// import editIcon from '../assets/pen_alkhalifi_design.png';

import './styles/card.css';
import './styles/icon.css';
import { commonDisplayStyles } from "./styles/commonDisplayStyles";
import './styles/common-styles.css';

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

  const TAG_TEXT = "ENROLLED";
  const TAG_BORDER_WIDTH = "1px";
  const TAG_BORDER_COLOR = "black";
  const TAG_FONT_SIZE = "20px";
  const TAG_DISPLAY_BLOCK = true;
  const nextPageIcon = '../assets/next.png';
  const editIcon = '../assets/pen_alkhalifi_design.png';
  const location = useLocation();

  return (
    <div className="card card-display--flex">
      
      <div>
        <i className="fa fa-road" style={commonDisplayStyles.icon24Style}></i>
      </div>

      <div style={{flexGrow: 9}}>
        <h4>
          <Link 
            to={to}
            state={{ from: location.pathname, payload: trackDetails }}>
              {trackDetails.title}
          </Link>
            {userIsEnrolled ? (<Tag text={TAG_TEXT} displayBlock={TAG_DISPLAY_BLOCK} borderWidth={TAG_BORDER_WIDTH} borderColor={TAG_BORDER_COLOR} fontSize={TAG_FONT_SIZE}/>) : null}
        </h4>
        {userIsEnrolled ? <ProgressBar percentage={progressBar.percentage} hasLabel={progressBar.hasLabel} labelOnRightSide={progressBar.labelOnRightSide}/> : null}
        <CollapsibleParagraph text={trackDetails.shortDescription} />
      </div>

      <Link 
        to={to}
        state={{ from: location.pathname, payload: trackDetails }}>
          <div>
            {
              editMode 
              ? <span className="material-symbols-outlined">
                  edit
                </span>
              : <span className="material-symbols-outlined">
                  navigate_next
                </span>
            }
          </div>
      </Link>

    </div>
  );
}