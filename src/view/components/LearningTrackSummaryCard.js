import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ProgressBar from "./ProgressBar";
import Tag from "./Tag";

import mainCardIcon from '../assets/hexagons_Prosymbols_Premium.png';
import nextPageIcon from '../assets/next.png';

import './styles/card.css';
import './styles/icon.css';

/*
  let slug = title.toLowerCase().replace(/ /g, "-");
  const url = "/tracks/" + slug;
*/

function LearningTrackSummaryCard({ title, shortDescription, userIsEnrolled, percentage, hasLabel, labelOnRightSide }) {

  const NEXT_PAGE_URL = "/track";
  const TAG_TEXT = "ENROLLED";
  const TAG_BORDER_WIDTH = "1px";
  const TAG_BORDER_COLOR = "black";
  const TAG_FONT_SIZE = "20px";
  const TAG_DISPLAY_BLOCK = true;

  return (
    <Link to={NEXT_PAGE_URL}>

      <div className="card card--clickable card-display--flex">
        
        <div>
          <img 
            src={mainCardIcon} 
            alt="main card icon" 
            className="icon--30px"/>
        </div>

        <div>
          <h4>
            {title}
            {userIsEnrolled ? (<Tag text={TAG_TEXT} displayBlock={TAG_DISPLAY_BLOCK} borderWidth={TAG_BORDER_WIDTH} borderColor={TAG_BORDER_COLOR} fontSize={TAG_FONT_SIZE}/>) : null}
          </h4>
          {userIsEnrolled ? <ProgressBar percentage={percentage} hasLabel={hasLabel} labelOnRightSide={labelOnRightSide}/> : null}
          <p>{shortDescription}</p>
        </div>

        <div>
          <img 
            src={nextPageIcon} 
            alt="next page icon" 
            className="icon--20px"/>
        </div>

      </div>

    </Link>
  );
}

LearningTrackSummaryCard.propTypes = {
  title: PropTypes.string,
  shortDescription: PropTypes.string,
  userIsEnrolled: PropTypes.bool,
  percentage: PropTypes.number
};

export default LearningTrackSummaryCard;