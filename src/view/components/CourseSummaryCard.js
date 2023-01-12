import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ProgressBar from "./ProgressBar";
import IconAndTextListItem from "./IconAndTextListItem";

import mainCardIcon from '../assets/hexagons_Prosymbols_Premium.png';
import nextPageIcon from '../assets/next.png';
import bulletIcon from "../assets/cell_Freepik.png";

import './styles/card.css';
import './styles/icon.css';
import { commonDisplayStyles } from "./styles/commonDisplayStyles";

/*
  let slug = title.toLowerCase().replace(/ /g, "-");
  const url = "/tracks/" + slug;
*/

function CourseSummaryCard({ title, shortDescription, nHours, userIsEnrolled, percentage, hasLabel, labelOnRightSide }) {

  const NEXT_PAGE_URL = "/course";
  const N_HOURS_TEXT = `${nHours} Hours`;
  const BULLET_ICON_SIZE = "10px";

  return (
    <Link to={NEXT_PAGE_URL}>

      <hr />

      <div className="card--clickable card-display--flex">
      
        <div>
          <img 
              src={mainCardIcon} 
              alt="main card icon" 
              className="icon--30px"/>
        </div>

        <div>
          <div>
            <h4 style={commonDisplayStyles.inline}>{title}</h4>
            <img 
              src={nextPageIcon} 
              alt="next page icon" 
              className="icon--20px"/>
          </div>

          {userIsEnrolled ? 
            <ProgressBar 
              percentage={percentage}
              hasLabel={hasLabel}
              labelOnRightSide={labelOnRightSide}/> : null }

          <p>{shortDescription}</p>

          <IconAndTextListItem 
            icon={bulletIcon}
            iconSize={BULLET_ICON_SIZE}
            text={N_HOURS_TEXT}/>
        </div>

      </div>

    </Link>
  );
}

CourseSummaryCard.propTypes = {
  title: PropTypes.string,
  shortDescription: PropTypes.string,
  userIsEnrolled: PropTypes.bool,
  percentage: PropTypes.number
};

export default CourseSummaryCard;