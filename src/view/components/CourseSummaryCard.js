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
import { commonDisplayStyles } from "./styles/commonDisplayStyles";

/*
  let slug = title.toLowerCase().replace(/ /g, "-");
  const url = "/tracks/" + slug;
*/

function CourseSummaryCard({ courseId, learningTrackId, title, shortDescription, nHours, userIsEnrolled, percentage, hasLabel, labelOnRightSide }) {

  const location = useLocation();
  const NEXT_PAGE_URL = `/course/${courseId}`;
  // const NEXT_PAGE_URL = location.pathname + NEXT_PAGE_URL_SUFFIX;
  const N_HOURS_TEXT = `${nHours} Hours`;
  const BULLET_ICON_SIZE = "10px";
  const SHORT_DESC_CHAR_LIMIT = 80;
  const iconAndTextListItemStyle = {
		iconSize: {
			height: BULLET_ICON_SIZE,
			width: BULLET_ICON_SIZE
		}
	};
  


  return (
    <div>

        <hr />

        <div className="card--clickable card-display--flex">
        
          <div>
            <span className="material-symbols-outlined" style={commonDisplayStyles.icon24Style}>collections_bookmark</span>
          </div>

          <div>
            <div>
              <Link 
                to={NEXT_PAGE_URL}
                state={{ from: location.pathname, learningTrackId: learningTrackId }}>
                  <h4 style={commonDisplayStyles.inline}>{title}</h4>
              </Link>
            </div>

            {userIsEnrolled ? 
              <ProgressBar 
                percentage={percentage}
                hasLabel={hasLabel}
                labelOnRightSide={labelOnRightSide}/> : null }

            <CollapsibleParagraph text={shortDescription} limit={SHORT_DESC_CHAR_LIMIT} />

            <IconAndTextListItem 
                  icon={bulletIcon}
                  text={N_HOURS_TEXT}
                  style={iconAndTextListItemStyle}/>

          </div>

          <Link 
            to={NEXT_PAGE_URL}
            state={{ from: location.pathname, learningTrackId: learningTrackId }}>
              <div>
                <span className="material-symbols-outlined">navigate_next</span>
              </div>
          </Link>

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

export default CourseSummaryCard;