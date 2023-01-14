import Editor from '@monaco-editor/react';

import TopicItemContentCard from "./TopicItemContentCard";
import CollapsibleHeadingAndListCard from "./CollapsibleHeadingAndListCard";

import './styles/card.css';

function CQView({ title, nXP, content, instructions, hints }) {

  const INSTRUCTIONS_HEADING = "Instructions";
  const HINTS_HEADING = "Hints";
  const EDITOR_HEADING = "Code Editor";
  const CONSOLE_HEADING = "Console Output";
  const SUBMIT_BUTTON_TEXT = "Submit";
  const RESET_BUTTON_TEXT = "Reset Editor";

  /** Callback functioned called every time you change the contents of the editor
   * @param {string} value the contents of the editor
   * @param {object} event event data that I don't yet (Jan 13) understand yet
   */
  const handleEditorChange = (value, event) => {

  };

  return (
    <div>
      <TopicItemContentCard 
        title={title}
        content={content}
        nXP={nXP}/>
      
      <CollapsibleHeadingAndListCard heading={INSTRUCTIONS_HEADING} list={instructions}/>

      <div className="card">
        <h4>{EDITOR_HEADING}</h4>
        <div style={{borderStyle: 'solid', borderWidth: '1px', borderColor: '#ACC8F1'}}>  
          <Editor 
            height='30vh'
            width='100%'
            language='javascript'
            value='// Hello, there!'
            onChange={handleEditorChange}/>
        </div>

        <div>
          <button type="button">{RESET_BUTTON_TEXT}</button>
          <button type="button">{SUBMIT_BUTTON_TEXT}</button>
        </div>
        
        <h4>{CONSOLE_HEADING}</h4>
        
        <p style={{borderStyle: 'solid', borderWidth: '1px', borderColor: '#ACC8F1'}}>Console Output</p>
      </div>

      

      <CollapsibleHeadingAndListCard heading={HINTS_HEADING} list={hints} closedByDefault={true}/>
    </div>
  );
}

export default CQView;