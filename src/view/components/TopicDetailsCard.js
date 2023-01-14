import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ProgressBar from "./ProgressBar";
import IconAndTextListItem from "./IconAndTextListItem";
import Tag from "./Tag";

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

/** A React.js component that represents a topic and displays a list of the topic items that
 *  comprise that topic.
 */

function TopicDetailsCard({ title, shortDescription, nXP, userIsEnrolled, percentage, hasLabel, labelOnRightSide, topicItems }) {

  const NEXT_PAGE_URL = "/topicitem";
  const BULLET_ICON_SIZE = "10px";
  const iconAndTextListItemStyle = {
		iconSize: {
			height: BULLET_ICON_SIZE,
			width: BULLET_ICON_SIZE
		},
    displayInline: true
	};
  const TAG_TEXT = `${nXP} XP`;
  const TAG_BORDER_WIDTH = "1px";
  const TAG_BORDER_COLOR = "black";
  const TAG_FONT_SIZE = "20px";
  const TAG_DISPLAY_BLOCK = true;
  const SHOW_ITEMS_TEXT = "Show Topic Items";
  const HIDE_ITEMS_TEXT = "Hide Topic Items";

  return (

    <div>
      <hr />

      <div style={commonDisplayStyles.displayFlex}>

        <div>
          <img src={mainCardIcon} alt="main card icon" className="icon--30px"/>
        </div>

        <div>

          <h4>{title}</h4>
          <Tag text={TAG_TEXT} displayBlock={TAG_DISPLAY_BLOCK} borderWidth={TAG_BORDER_WIDTH} borderColor={TAG_BORDER_COLOR} fontSize={TAG_FONT_SIZE}/>

          {userIsEnrolled ? 
              <ProgressBar 
                percentage={percentage}
                hasLabel={hasLabel}
                labelOnRightSide={labelOnRightSide}/> : null }

          <p>{shortDescription}</p>

          <details>
            <summary>
              <span>{SHOW_ITEMS_TEXT}</span>
              <img src={bulletIcon} alt="main card icon" className="icon--10px"/>
            </summary>

            {
              topicItems.map(topicItem => 
                <Link 
                  to={NEXT_PAGE_URL}
                  key={topicItem.title}>

                    <div style={commonDisplayStyles.displayFlex}>

                      <div style={commonDisplayStyles.inline}>
                        <IconAndTextListItem 
                          icon={bulletIcon}
                          text={topicItem.title}
                          style={iconAndTextListItemStyle}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </div>
                      
                      <div style={commonDisplayStyles.inline}>
                        <IconAndTextListItem 
                          icon={bulletIcon}
                          text={`${topicItem.xp} XP`}
                          style={iconAndTextListItemStyle}/>
                        <img src={bulletIcon} alt="main card icon" className="icon--10px"/>
                      </div>                    

                    </div>
                </Link>)
            }

          </details>

        </div>

      </div>

    </div>
  );
}

TopicDetailsCard.propTypes = {
  title: PropTypes.string,
  shortDescription: PropTypes.string,
  userIsEnrolled: PropTypes.bool,
  percentage: PropTypes.number,
  hasLabel: PropTypes.bool,
  labelOnRightSide: PropTypes.bool, 
  topicItems: PropTypes.array
};

export default TopicDetailsCard;