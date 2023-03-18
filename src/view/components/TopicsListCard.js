import React from "react";
import PropTypes from 'prop-types';

import TopicDetailsCard from "./TopicDetailsCard";

import mainCardIcon from '../assets/hexagons_Prosymbols_Premium.png';
import bulletIcon from "../assets/cell_Freepik.png";

import './styles/icon.css';
import './styles/card.css';
import { styles } from "./styles/commonDisplayStyles";
import { constants } from "../../modelsAndData/constants";

/** A React.js component the displays lists of the topics that comprise the
 *  course screen that contains this component, and sublists of the topic items that
 *  comprise each of those topics. 
 */

export default function TopicsListCard({ topicsData, userIsEnrolled }) {

  /* <span class="material-symbols-outlined">
        category
      </span> */

  const MAIN_ICON_MARGIN_RIGHT = '10px';
  const FONT_ICON_AND_TEXT_SEPARATION = '10px';
  const DEFAULT_MARGIN = '10px';
  const BODY_TEXT_RIGHT_MARGIN = '30px';

  const { PRIMARY_TEXT_COLOR_DARK } = constants;
  const TEXT_COLOR = PRIMARY_TEXT_COLOR_DARK;

  return ( 
    <>
      <div className="card">

        <div>
          <span className="material-symbols-outlined" style={{ ...styles.mainIcon24pxFont, marginRight: MAIN_ICON_MARGIN_RIGHT }}>topic</span>
					<span style={{ color: TEXT_COLOR, ...styles.h3SizeAndWeight }} >Topics</span>
        </div>

        {topicsData.map(topic => 
          <TopicDetailsCard 
            key={topic.title}
            title={topic.title}
            shortDescription={topic.description}
            nXP={topic.xp}
            userIsEnrolled={userIsEnrolled}
            percentage={topic.percentage}
            hasLabel={true}
            labelOnRightSide={false}
            topicItems={topic.topicItems}/>)}
      </div>
    </>
  );
}

TopicsListCard.propTypes = {
  topicsData: PropTypes.array,
  userIsEnrolled: PropTypes.bool
};