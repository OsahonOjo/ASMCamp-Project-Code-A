import TopicItemContentCard from "./TopicItemContentCard";

function LessonView({ title, nXP, content }) {

  const BUTTON_TEXT = "Continue";

  return (
    <div>
      <TopicItemContentCard 
        title={title}
        content={content}
        nXP={nXP}/>
      <button type="button">{BUTTON_TEXT}</button>
    </div>
  );
}

export default LessonView;