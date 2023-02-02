import Tag from './Tag';

import './styles/card.css';
import { commonDisplayStyles } from './styles/commonDisplayStyles';

function TFQResponseCard({ topicItemId, handleSubmit, showModal }) {

  const HEADING_TEXT = "Responses";
  const TRUE_TEXT = "True";
  const FALSE_TEXT = "False";


  return (
    <form className='card'> 
      <h4>{HEADING_TEXT}</h4>

      <div>

        <button onClick={() => { 
          let isCorrect = handleSubmit(topicItemId, true);
          showModal(isCorrect);
         }}>
          <input type="radio" name="tfqOptionChosen" value={true} />
          <label>{TRUE_TEXT}</label>
        </button><br />

        <button onClick={() => { 
          let isCorrect = handleSubmit(topicItemId, false);
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