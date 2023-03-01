import Tag from './Tag';

import './styles/card.css';
import { commonDisplayStyles } from './styles/commonDisplayStyles';

function TFQResponseCard({ trackId, courseId, topicId, topicItemId, handleSubmit, showModal }) {

  const HEADING_TEXT = "Responses";
  const TRUE_TEXT = "True";
  const FALSE_TEXT = "False";


  return (
    <form className='card'> 
      <h4>{HEADING_TEXT}</h4>

      <div>

        <button onClick={async () => { 
          let isCorrect = await handleSubmit(trackId, courseId, topicId, topicItemId, true);
          showModal(isCorrect);
         }}>
          <input type="radio" name="tfqOptionChosen" value={true} />
          <label>{TRUE_TEXT}</label>
        </button><br />

        <button onClick={async () => { 
          let isCorrect = await handleSubmit(trackId, courseId, topicId, topicItemId, false);
          showModal(isCorrect);
        }}>
          <input type="radio" name="tfqOptionChosen" value={false} />
          <label>{FALSE_TEXT}</label>
        </button><br />

      </div>

    </form>
  );
}

export default TFQResponseCard;