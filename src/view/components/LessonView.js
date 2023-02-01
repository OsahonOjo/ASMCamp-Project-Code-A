import TopicItemContentCard from "./TopicItemContentCard";

function LessonView({ topicItemId, title, nXP, content, handleSubmit }) {

  const BUTTON_TEXT = "Continue";

  return (
    <div>
      <TopicItemContentCard 
        title={title}
        content={content}
        nXP={nXP}/>
      <button type="button" onClick={ () => { handleSubmit(topicItemId) } }>{BUTTON_TEXT}</button>
    </div>
  );
}

export default LessonView;