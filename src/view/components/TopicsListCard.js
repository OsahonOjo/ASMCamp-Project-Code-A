import React from "react";
import PropTypes from 'prop-types';

import TopicDetailsCard from "./TopicDetailsCard";

import mainCardIcon from '../assets/hexagons_Prosymbols_Premium.png';
import bulletIcon from "../assets/cell_Freepik.png";

import './styles/icon.css';
import './styles/card.css';

/** A React.js component the displays lists of the topics that comprise the
 *  course screen that contains this component, and sublists of the topic items that
 *  comprise each of those topics. 
 */

function TopicsListCard({ topics, userIsEnrolled }) {

  return (
    <>
      <details open className="card card--clickable">

        <summary>
          <img src={mainCardIcon} alt="main card icon" className="icon--30px"/>
					<span>Topics</span>
					<img src={bulletIcon} alt="main card icon" className="icon--10px"/>
        </summary>

        {topics.map(topic => 
          <TopicDetailsCard 
            key={topic.title}
            title={topic.title}
            shortDescription={topic.shortDescription}
            userIsEnrolled={userIsEnrolled}
            percentage={topic.percentage}
            hasLabel={true}
            labelOnRightSide={false}
            topicItems={topic.topicItems}/>)}
      </details>
    </>
  );
}

TopicsListCard.propTypes = {
  topics: PropTypes.array,
  userIsEnrolled: PropTypes.bool
};

export default TopicsListCard;