/* libraries */
import React from "react";

/* components */
import TopicCardBody from "./TopicCardBody";
import TopicCardHeader from "./TopicCardHeader";

/* styles */
import '../styles/topicCard.css';

/* incoming props: {topic} */
function TopicCard({topic}) {

  return (
    <div className="card">
      <TopicCardHeader topicId={topic.id} title={topic.title} shortDescription={topic.shortDescription} hours={topic.hours} nLessons={"Y"} nLessonsCompleted={"X"} nQuestions={"Y"} nQuestionsCompleted={"X"} nXP={topic.xp} nXPEarned={120} />  {/* outgoing props: {topicId, title, shortDescription, hours, nLessons, nLessonsCompleted, nQuestions, nQuestionsCompleted, nXP, nXPEarned} */}
      <TopicCardBody topicId={topic.id} topicItems={topic.material} />  {/* outgoing props: {topicItems} */}
    </div>
  );
}

export default TopicCard;
