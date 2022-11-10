/* libraries */
import React from "react";
import { Link, useLocation } from "react-router-dom";

/* assets */
import backIcon from "../assets/back.png";
import forwardIcon from "../assets/next.png";

/* components */
import BackButtonNavbar from "./BackButtonNavbar";

/* data */
import Model from "../data/model";

/* styles */
import "../styles/TopicItemScreen.css";

function TopicItemScreen() {
  const ids = useLocation().state; /* state: {topicId, topicItemId} */
  const model = new Model();
  const topicItem = model.getTopicItem(ids.topicId, ids.topicItemId);
  const partialView = null;

  switch(topicItem.type) {
    case "LSN":
      break;

    case "MCQ":
      break;

    case "SAQ":
      break;

    case "TFQ":
      break;

    case "CQ":
      break;

    default:
      partialView = null;
      break;
  }
  

  return (
    <>
      <BackButtonNavbar text={topicItem.title}/>

      <div className="topic-item-nav">
        <button type="button"><img src={backIcon} alt="go to previous topic item"/></button>
        <button type="button">Topic Outline</button>
        <button type="button"><img src={forwardIcon} alt="go to next topic item"/></button>
      </div>

      {partialView}

      <progress></progress>
    </>
  );
}

export default TopicItemScreen;