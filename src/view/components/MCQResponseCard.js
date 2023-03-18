import Tag from './Tag';

import './styles/card.css';
import { styles } from './styles/commonDisplayStyles';

function MCQResponseCard({ trackId, courseId, topicId, topicItemId, options, handleSubmit, showModal }) {

  const HEADING_TEXT = "Responses";
  const DEFAULT_MARGIN = '10px';

  const buttonStyle = { 
    width: '90%', 
    height: '2em', 
    margin: DEFAULT_MARGIN,
    fontSize: '20px', 
    fontWeight: 'normal',
    color: styles.vDarkModeTextColor3,
    backgroundColor: styles.vDarkModeBackground1,
    textAlign: 'left',
    // borderStyle: 'solid',
    // borderColor: styles.vDarkModeTextColor3,
    borderWidth: '0px' 
  };

  return ( 
    <form className='card'> 
      <h4>{HEADING_TEXT}</h4>

      {options.map((option, index) => 
        <div key={index}>

          <button 
            style={buttonStyle}
            onClick={async () => { 
              let isCorrect = await handleSubmit(trackId, courseId, topicId, topicItemId, index);
              showModal(isCorrect); 
            }}>

              <input 
                type="radio" 
                name="mcqOptionChosen" 
                value={option}
                style={{ marginRight: DEFAULT_MARGIN }} /> 

              <label style={{ fontWeight: 'normal' }}>
                {option}
              </label>

          </button>

        </div> )}

    </form>
  );
}

export default MCQResponseCard;