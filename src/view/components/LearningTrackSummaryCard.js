import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ProgressBar from "./ProgressBar";
import Tag from "./Tag";
import CollapsibleParagraph from './CollapsibleParagraph';

import nextPageIcon from '../assets/next.png';
import editIcon from '../assets/pen_alkhalifi_design.png';

import './styles/card.css';
import './styles/icon.css';
import { commonDisplayStyles } from "./styles/commonDisplayStyles";
import './styles/common-styles.css';

function LearningTrackSummaryCard({ trackId, title, shortDescription, userIsEnrolled, percentage, hasLabel, labelOnRightSide, editMode, to }) {

  const NEXT_PAGE_URL = "/track";
  const TAG_TEXT = "ENROLLED";
  const TAG_BORDER_WIDTH = "1px";
  const TAG_BORDER_COLOR = "black";
  const TAG_FONT_SIZE = "20px";
  const TAG_DISPLAY_BLOCK = true;

  return (
    <div className="card card-display--flex">
      
      <div>
        <i className="fa fa-road" style={commonDisplayStyles.icon24Style}></i>
      </div>

      <div>
        <h4>
          <Link 
            to={to ? to : NEXT_PAGE_URL}
            state={{
              from: to ? to : NEXT_PAGE_URL,
              trackId: trackId 
            }} >
            {title}
          </Link>
            {userIsEnrolled ? (<Tag text={TAG_TEXT} displayBlock={TAG_DISPLAY_BLOCK} borderWidth={TAG_BORDER_WIDTH} borderColor={TAG_BORDER_COLOR} fontSize={TAG_FONT_SIZE}/>) : null}
        </h4>
        {userIsEnrolled ? <ProgressBar percentage={percentage} hasLabel={hasLabel} labelOnRightSide={labelOnRightSide}/> : null}
        <CollapsibleParagraph text={shortDescription} />
      </div>

      <Link 
        to={to ? to : NEXT_PAGE_URL}
        state={{
          from: to ? to : NEXT_PAGE_URL,
          trackId: trackId 
        }} >
        <div>
          {
            editMode 
            ? <img 
                src={editIcon} 
                alt="next page icon" 
                className="icon--20px"/> 
            : <span className="material-symbols-outlined">
                navigate_next
              </span>
          }
        </div>
      </Link>

    </div>
  );
}

LearningTrackSummaryCard.propTypes = {
  title: PropTypes.string,
  shortDescription: PropTypes.string,
  userIsEnrolled: PropTypes.bool,
  percentage: PropTypes.number
};

export default LearningTrackSummaryCard;