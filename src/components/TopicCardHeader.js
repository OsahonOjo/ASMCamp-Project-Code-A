/* libraries */
import React from "react";
import { Link } from 'react-router-dom';

/* assets */
import topicIcon from '../assets/share.png';

/* components */
//import { TopicCardHeaderLink } from '../styles/linkStyles.js';

/* styles */
import "../styles/topicCard.css";


/* incoming props: {title, shortDescription, hours, nLessons, nLessonsCompleted, nQuestions, nQuestionsCompleted, nXP, nXPEarned} */
function TopicCardHeader({ topicId, title, shortDescription, hours, nLessons, nLessonsCompleted, nQuestions, nQuestionsCompleted, nXP, nXPEarned }) {

// /topic/details

  return (
    <div className="header">
      <div className="header-flex-container">
        <img src={topicIcon} alt="topic icon" className="list-item-icon"/>
        <Link to="/topic/details" state={{ topicId: topicId }}>{title}</Link>
        <Link to="/topic/item"><button>Start</button></Link>
      </div>
      <div className="header-topic-details">
        <p className="header-text">{shortDescription}</p>
        <p className="header-text">Estimated completion time: {hours} hours</p>
      </div>
      <br />

      <div className="header-topic-details">
        <span>Progress</span><br />
        <progress id="progress-bar" value="12" max="100"></progress>
        <label for="progress-bar"> <span>{Math.round((nXPEarned/nXP) * 100)}</span>%</label>
        <p className="header-text"><span>{nXPEarned}</span>/<span>{nXP}</span> XP</p>
        <p className="header-text"><span>{nLessonsCompleted}</span>/<span>{nLessons}</span> Lessons</p>
        <p className="header-text"><span>{nQuestionsCompleted}</span>/<span>{nQuestions}</span> Questions</p>
        <br></br>
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default TopicCardHeader;
