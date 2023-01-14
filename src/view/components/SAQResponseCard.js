import Tag from './Tag';

import './styles/card.css';
import { commonDisplayStyles } from './styles/commonDisplayStyles';

function SAQResponseCard() {

  const RESPONSE_HEADING = "Responses";
  const SUBMIT_BUTTON_TEXT = "Submit";


  return (
    <form className="card">
      <h4>{RESPONSE_HEADING}</h4>
      <input type="text" style={{borderWidth: '0px', borderBottomWidth: '1px'}}/><br />
      <button type="submit">{SUBMIT_BUTTON_TEXT}</button>
    </form>
  );
}

export default SAQResponseCard;