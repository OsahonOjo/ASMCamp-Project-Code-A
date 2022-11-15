/* libraries */
import React from "react";

/* assets */
import topicItemIcon from "../assets/share.png";
import forwardIcon from "../assets/next.png";

/* styles */
import "../styles/topicCard.css";

function TopicCardTopicItem({ title }) {

  return (
    /* add Bootstrap styling and Font Awesome icons to this */
    <>
      <hr></hr>
      <div className="topic-item ">
        <img src={topicItemIcon} alt="topic item icon" className="list-item-icon topic-item-element" />
        <p className="topic-header-text topic-item-element">{title}</p>
        <div>
          <img src={topicItemIcon} alt="topic item completed icon" className="list-item-icon topic-item-element" />
          <p className="topic-header-text inline topic-item-element">XP</p>
          <img src={forwardIcon} alt="topic item completed icon" className="list-item-icon topic-item-element" />
        </div>
      </div>
      </>
  );
}

export default TopicCardTopicItem;
