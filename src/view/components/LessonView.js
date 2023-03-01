import TopicItemContentCard from "./TopicItemContentCard";

export default function LessonView({ trackId, courseId, topicId, topicItemId, title, nXP, content, handleSubmit, showModal }) {

  const BUTTON_TEXT = "Continue";

  return (
    <div>

      <TopicItemContentCard 
        title={title}
        content={content}
        nXP={nXP}/>

      <button 
        type="button" 
        onClick={async () => { 
          let isCorrect = await handleSubmit(trackId, courseId, topicId, topicItemId);
          showModal(isCorrect); 
        }}>
          {BUTTON_TEXT}
      </button>

    </div>
  );
}