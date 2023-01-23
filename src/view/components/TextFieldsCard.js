import './styles/card.css';

/**
 * A React.js component that wraps a form, which contains several predefined form fields
 * that are hidden or unhidden based in the properties set to true in the fields prop
 * @param {object} props 
 * @param {object} props.fields
 * @param {boolean} props.fields.title
 * @param {boolean} props.fields.shortDescription
 * @param {boolean} props.fields.longDescription
 * @param {boolean} props.fields.seqNumber
 * @param {boolean} props.fields.xp
 * @param {boolean} props.fields.content
 */

/*
<div className="card">
          <p>Title</p>
          <input type="text" />
        </div>
        <div className="card">
          <p>Short description</p>
          <textarea></textarea>
        </div>
        <div className="card">
          <p>Long description</p>
          <textarea></textarea>
        </div>
*/

function TextFieldsCard({ fields }) {

  const SUBMIT_TEXT = "Save";

  const titleField = 
    <div>
      <label>Title</label><br />
      <input type="text" />
    </div>;

  const shortDescriptionField = 
    <div>
      <label>Short Description</label><br />
      <textarea></textarea>
    </div>;

  const longDescriptionField = 
    <div>
      <label>Long Description</label><br />
      <textarea></textarea>
    </div>;

  const seqNumberField = 
    <div>
      <label>Sequence Number</label><br />
      <input type="text" />
    </div>;

  const xpField = 
    <div>
      <label>XP</label><br />
      <input type="text" />
    </div>;

  const contentField = 
    <div>
      <label>Content</label><br />
      <textarea></textarea>
    </div>;


	return (
		<form className='card'>
      {fields.title ? titleField : null}
      {fields.seqNumber ? seqNumberField : null}
      {fields.xp ? xpField : null}
      {fields.shortDescription ? shortDescriptionField : null}
      {fields.longDescription ? longDescriptionField : null}
      {fields.content ? contentField : null}
      <button type="submit">{SUBMIT_TEXT}</button>
		</form>
	);
}

export default TextFieldsCard;