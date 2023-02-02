import React from 'react';

import Tag from './Tag';

import './styles/card.css';
import { commonDisplayStyles } from './styles/commonDisplayStyles';

function SAQResponseCard({ topicItemId, handleSubmit, showModal }) {

  const RESPONSE_HEADING = "Responses";
  const SUBMIT_BUTTON_TEXT = "Submit";
  const [input, setInput] = React.useState("");

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    let processedInput = input.toLowerCase();
    let isCorrect = handleSubmit(topicItemId, processedInput);
    showModal(isCorrect);
  }

  return (
    <form className="card" onSubmit={handleFormSubmit}>
      <h4>{RESPONSE_HEADING}</h4>

      <input
        type="text" 
        style={{borderWidth: '0px', borderBottomWidth: '1px'}} 
        value={input} onChange={handleInputChange}/><br />

      <button type="submit">{SUBMIT_BUTTON_TEXT}</button>
    </form>
  );
}

export default SAQResponseCard;