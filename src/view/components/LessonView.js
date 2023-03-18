import TopicItemContentCard from "./TopicItemContentCard";

import { styles } from "./styles/commonDisplayStyles";

export default function LessonView({ trackId, courseId, topicId, topicItemId, title, nXP, content, handleSubmit, showModal }) {

  const BUTTON_TEXT = "Continue";
  const DEFAULT_MARGIN = '10px';

  const buttonStyle = { 
    width: '150px', 
    height: '2em', 
    margin: DEFAULT_MARGIN,
    fontSize: '16px', 
    color: styles.vDarkModeTextColor3,
    backgroundColor: styles.vDarkModeBackground1,
    borderStyle: 'solid',
    borderColor: styles.vDarkModeTextColor3,
    borderWidth: '1px' 
  };

  return (
    <div>

      <TopicItemContentCard 
        title={title}
        content={content}
        nXP={nXP}/>

      <div style={{ textAlign: 'right', marginTop: '-15px' }}>
        <button 
          type="button" 
          style={{ ...buttonStyle }}
          onClick={async () => { 
            let isCorrect = await handleSubmit(trackId, courseId, topicId, topicItemId);
            showModal(isCorrect); 
          }}>
            {BUTTON_TEXT}
        </button>
      </div>

    </div>
  );
}