import Tag from './Tag';

import './styles/card.css';
import { styles } from './styles/commonDisplayStyles';

function TFQResponseCard({ trackId, courseId, topicId, topicItemId, handleSubmit, showModal }) {

  const HEADING_TEXT = "Responses";
  const TRUE_TEXT = "True";
  const FALSE_TEXT = "False";
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
    borderWidth: '0px' 
  };

  return (
    <form className='card'> 
      <h4>{HEADING_TEXT}</h4>

      <div>

        <button 
          style={buttonStyle}
          onClick={async () => { 
            let isCorrect = await handleSubmit(trackId, courseId, topicId, topicItemId, true);
            showModal(isCorrect);
         }}>
          <input style={{ marginRight: DEFAULT_MARGIN }} type="radio" name="tfqOptionChosen" value={true} />
          <label>{TRUE_TEXT}</label>
        </button><br />

        <button 
          style={buttonStyle}
          onClick={async () => { 
            let isCorrect = await handleSubmit(trackId, courseId, topicId, topicItemId, false);
            showModal(isCorrect);
        }}>
          <input style={{ marginRight: DEFAULT_MARGIN }} type="radio" name="tfqOptionChosen" value={false} />
          <label>{FALSE_TEXT}</label>
        </button><br />

      </div>

    </form>
  );
}

export default TFQResponseCard;