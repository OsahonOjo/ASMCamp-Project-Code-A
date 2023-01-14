import Tag from './Tag';

import './styles/card.css';
import { commonDisplayStyles } from './styles/commonDisplayStyles';

function MCQResponseCard({ options }) {

  const HEADING_TEXT = "Responses";

  return (
    <form className='card'> 
      <h4>{HEADING_TEXT}</h4>
      {options.map(option => 
        <div key={option}>
          <button>
            <input type="radio" name="mcqOptionChosen" value={option} />
            <label>{option}</label>
          </button>
        </div>)}
    </form>
  );
}

export default MCQResponseCard;