import React from 'react';

import Tag from './Tag';

import './styles/card.css';
import { commonDisplayStyles } from './styles/commonDisplayStyles';

function SAQResponseCard({ trackId, courseId, topicId, topicItemId, handleSubmit, showModal }) {

  const RESPONSE_HEADING = "Responses";
  const SUBMIT_BUTTON_TEXT = "Submit";
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

      <input
        type="text" 
        style={{borderWidth: '0px', borderBottomWidth: '1px'}} 
        value={input} onChange={handleInputChange}/><br />

      <button type="submit">{SUBMIT_BUTTON_TEXT}</button>
    </form>
  );
}

export default SAQResponseCard;