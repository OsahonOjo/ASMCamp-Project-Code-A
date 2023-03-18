import React from 'react';

import Tag from './Tag';

import './styles/card.css';
import { styles } from './styles/commonDisplayStyles';

import { constants } from '../../modelsAndData/constants';
 
function SAQResponseCard({ trackId, courseId, topicId, topicItemId, handleSubmit, showModal }) {

  const RESPONSE_HEADING = "Responses";
  const SUBMIT_BUTTON_TEXT = "Submit";
  const DEFAULT_MARGIN = '10px';

  const { PRIMARY_TEXT_COLOR_DARK, SECONDARY_BACKGROUND_COLOR_DARK } = constants;
  const TEXT_COLOR = PRIMARY_TEXT_COLOR_DARK;
 
  const buttonStyle = { 
    width: '100px', 
    height: '2em', 
    margin: DEFAULT_MARGIN,
    fontSize: '18px', 
    fontWeight: 'normal',
    color: styles.vDarkModeTextColor3,
    backgroundColor: styles.vDarkModeBackground1,
    // textAlign: 'left',
    borderWidth: '1px',
    borderColor: TEXT_COLOR
  };

  const inputStyle = { 
    height: '1.15em', 
    width: '90%', 
    borderWidth: '0px', 
    marginBottom: '15px', 
    marginTop: DEFAULT_MARGIN, 
    borderBottomWidth: '2px', 
    borderColor: TEXT_COLOR, 
    backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, 
    color: TEXT_COLOR,
    fontSize: '18px',
  };

  const [input, setInput] = React.useState("");

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    //let processedInput = input.toLowerCase();
    let processedInput = input.slice();
    let isCorrect = await handleSubmit(trackId, courseId, topicId, topicItemId, processedInput);
    showModal(isCorrect);
  }

  return (
    <form className="card" onSubmit={handleFormSubmit}>
      <h4>{RESPONSE_HEADING}</h4>

      <div style={{ textAlign: 'center' }}>

        <input
          type="text" 
          style={inputStyle} 
          value={input} onChange={handleInputChange}/><br />

        <button style={buttonStyle} type="submit">{SUBMIT_BUTTON_TEXT}</button>

      </div>
    </form>
  );
}

export default SAQResponseCard;