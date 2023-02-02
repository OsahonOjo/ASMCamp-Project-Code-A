import Tag from './Tag';

import './styles/card.css';
import { commonDisplayStyles } from './styles/commonDisplayStyles';

function MCQResponseCard({ topicItemId, options, handleSubmit, showModal }) {

  const HEADING_TEXT = "Responses";

  // optionIndex

  return (
    <form className='card'> 
      <h4>{HEADING_TEXT}</h4>
      {options.map((option, index) => 
        <div key={index}>
          <button onClick={() => { 
            let isCorrect = handleSubmit(topicItemId, index);
            showModal(isCorrect);
          }}>
            <input type="radio" name="mcqOptionChosen" value={option}/> 
            <label>{option}</label>
          </button>
        </div>)}
    </form>
  );
}

export default MCQResponseCard;