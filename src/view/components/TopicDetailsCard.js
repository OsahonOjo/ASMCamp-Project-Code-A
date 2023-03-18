import React from "react";
import PropTypes from 'prop-types';
import { Link, useLocation, useParams } from 'react-router-dom';

import ProgressBar from "./ProgressBar";
import IconAndTextListItem from "./IconAndTextListItem";
import FontIconAndTextListItem from "./FontIconAndTextListItem";
import Tag from "./Tag";
import CollapsibleParagraph from "./CollapsibleParagraph";

import mainCardIcon from '../assets/hexagons_Prosymbols_Premium.png';
import nextPageIcon from '../assets/next.png';
import bulletIcon from "../assets/cell_Freepik.png";

import './styles/card.css';
import './styles/icon.css';
import { styles } from "./styles/commonDisplayStyles";
import { constants } from "../../modelsAndData/constants";

/*
  let slug = title.toLowerCase().replace(/ /g, "-");
  const url = "/tracks/" + slug;
*/

/** A React.js component that represents a topic and displays a list of the topic items that
 *  comprise that topic.
 */

export default function TopicDetailsCard({ title, shortDescription, nXP, userIsEnrolled, percentage, hasLabel, labelOnRightSide, topicItems }) {

  const NEXT_PAGE_URL = "/topicitem";
  const BULLET_ICON_SIZE = "10px";
  const iconAndTextListItemStyle = {
		iconSize: {
			height: BULLET_ICON_SIZE,
			width: BULLET_ICON_SIZE
		},
    displayInline: true
	};
  const TAG_TEXT = `${nXP ? nXP : 0} XP`;
  const TAG_BORDER_WIDTH = "1px";
  const TAG_BORDER_COLOR = "black";
  const TAG_FONT_SIZE = "20px";
  const TAG_DISPLAY_BLOCK = true;
  const SHOW_ITEMS_TEXT = "Show Topic Items";
  const HIDE_ITEMS_TEXT = "Hide Topic Items";

  const MAIN_ICON_MARGIN_RIGHT = '10px';
  const FONT_ICON_AND_TEXT_SEPARATION = '10px';
  const DEFAULT_MARGIN = '10px';
  const BODY_TEXT_RIGHT_MARGIN = '20px';

  const { PRIMARY_TEXT_COLOR_DARK } = constants;
  const TEXT_COLOR = PRIMARY_TEXT_COLOR_DARK;

  const location = useLocation();

  const mainIcon = 
    <div>
      <span 
        className="material-symbols-outlined" 
        style={{ ...styles.mainIcon24pxFont, marginRight: MAIN_ICON_MARGIN_RIGHT }}>
          topic
      </span>
    </div>;

  const xpTag = 
    <Tag 
      text={{
        content: TAG_TEXT,
        style: { 
          color: TEXT_COLOR,
          fontSize: TAG_FONT_SIZE
        }
      }} 
      container={{
        baseStyle: { 
          display: 'inline',
          borderWidth: TAG_BORDER_WIDTH,
          borderColor: TEXT_COLOR
        },
        otherStyle: {
          marginLeft: DEFAULT_MARGIN,
          padding: '0px',
          borderRadius: '5px'
        }
      }} />;

  // NOTE: function is very coupled; relies on several component-level global variables
  function xpTagBuilder(text) {
    return (
      <Tag 
        text={{
          content: text,
          style: { 
            color: TEXT_COLOR,
            fontSize: '16px'
          }
        }} 
        container={{
          baseStyle: { 
            display: 'block'
          },
          otherStyle: {
            padding: '0px',
            borderRadius: '5px'
          }
        }} />
    );
  }  

  return (

    <>
      <hr />

      <div style={styles.displayFlexRow}>

        {mainIcon}

        <div>
          <div style={{ color: TEXT_COLOR, ...styles.h4SizeAndWeight }}>{title}{xpTag}</div>

          <p>
            {
              userIsEnrolled 
                ? <ProgressBar 
                    percentage={percentage}
                    hasLabel={hasLabel}
                    labelOnRightSide={labelOnRightSide}/> 
                : null 
            }
          </p>

          <CollapsibleParagraph 
            text={shortDescription}
            paragraphStyle={{ color: TEXT_COLOR, marginRight: BODY_TEXT_RIGHT_MARGIN }} />

          <details open>
            <summary style={{ marginBottom: '20px' }}>
              <br/>
              <span style={{ color: TEXT_COLOR }}>{SHOW_ITEMS_TEXT}</span>
              <span 
                className="material-symbols-outlined"
                style={{ color: TEXT_COLOR, ...styles.downChevron, marginLeft: MAIN_ICON_MARGIN_RIGHT }}>
                  expand_more
              </span>
            </summary>

            {
              topicItems.map((topicItem, index) => 
                <Link 
                  to={`/topic/${topicItem.topicId}/item/${index+1}`}
                  state={{ courseId: topicItem.courseId }}
                  key={topicItem.title}>
                    <div style={{ ...styles.displayFlexRow, marginBottom: DEFAULT_MARGIN }}>

                      <div style={{ marginTop: DEFAULT_MARGIN }}>
                        <span className="material-symbols-outlined" style={{ ...styles.listItemIcon14pxFont, marginRight: MAIN_ICON_MARGIN_RIGHT }}>category</span>
                      </div>

                      <div>
                          {xpTagBuilder(`${topicItem.xp ? topicItem.xp : 0} XP`)}
                          
                          <div style={{ ...styles.displayFlexRow }}>
                              <p style={{ flexGrow: 9 }}>
                                <span style={{ color: TEXT_COLOR }}>{topicItem.title}</span>
                              </p>
                            <span 
                              className="material-symbols-outlined" 
                              style={{ ...styles.icon35pxFont, color: TEXT_COLOR, flexGrow: 0 }}>
                                navigate_next
                            </span>
                          </div>
                          
                      </div>

                      
                    </div>
                </Link>)
            }

          </details>

        </div>

      </div>

    </>
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

/*
    <IconAndTextListItem 
      icon={bulletIcon}
      text={topicItem.title}
      style={iconAndTextListItemStyle}/>

    <div style={styles.inline}>
      <IconAndTextListItem 
        icon={bulletIcon}
        text={}
        style={iconAndTextListItemStyle}/>
      <img src={bulletIcon} alt="main card icon" className="icon--10px"/>
    </div>   
*/