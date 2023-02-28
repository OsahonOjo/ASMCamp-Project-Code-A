import TopicItemContentCard from "./TopicItemContentCard";

export default function LessonView({ trackId, topicItemId, title, nXP, content, handleSubmit, showModal }) {

  const BUTTON_TEXT = "Continue";

  return (
    <div>

      <TopicItemContentCard 
        title={title}
        content={content}
        nXP={nXP}/>

      <button 
        type="button" 
        onClick={() => { 
          let isCorrect = handleSubmit(trackId, topicItemId);
          showModal(isCorrect); 
        }}>
          {BUTTON_TEXT}
      </button>

    </div>
  );
}