/* libraries */
import React from "react";
import { Link } from "react-router-dom";

/* components */
import TopicCardTopicItem from "./TopicCardTopicItem";

/* styles */
import '../styles/topicCard.css';
import { noUnderline } from "../styles/linkStyles.js";


/* incoming props: {topicId, topicItems} */
function TopicCardBody({ topicId, topicItems }) {
  
  return (
    <details open>
      <summary>Show Topic Details</summary>
      <div>
        { topicItems.map(topicItem => 
          <Link to="/topic/item" state={{ topicId: topicId, topicItemId: topicItem.id }} style={{ noUnderline }}>
            <TopicCardTopicItem key={topicItem.id} title={topicItem.title} />
          </Link>) }
      </div>
    </details>
  );
}

export default TopicCardBody;