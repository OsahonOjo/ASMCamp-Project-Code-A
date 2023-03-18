import Editor from '@monaco-editor/react';

import TopicItemContentCard from "./TopicItemContentCard";
import CollapsibleHeadingAndListCard from "./CollapsibleHeadingAndListCard";

import './styles/card.css';
import { styles } from './styles/commonDisplayStyles';

import { constants } from '../../modelsAndData/constants';

function CQView({ trackId, courseId, topicId, topicItemId, title, nXP, content, instructions, hints }) {

  const INSTRUCTIONS_HEADING = "Instructions";
  const HINTS_HEADING = "Hints";
  const EDITOR_HEADING = "Code Editor";
  const CONSOLE_HEADING = "Console Output";
  const SUBMIT_BUTTON_TEXT = "Submit";
  const RESET_BUTTON_TEXT = "Reset Editor";

  const {
    PRIMARY_TEXT_COLOR_DARK,
    SECONDARY_BACKGROUND_COLOR_DARK
  } = constants;
  const TEXT_COLOR = PRIMARY_TEXT_COLOR_DARK;
  const DEFAULT_MARGIN = '10px';
  const DEFAULT_PADDING = '10px';

  const buttonStyle = { 
    width: '150px', 
    height: '2em', 
    margin: DEFAULT_MARGIN,
    fontSize: '16px', 
    color: styles.vDarkModeTextColor3,
    backgroundColor: styles.vDarkModeBackground1,
    borderStyle: 'solid',
    borderColor: styles.vDarkModeTextColor3,
    borderWidth: '1px' 
  };

  /** Callback functioned called every time you change the contents of the editor
   * @param {string} value the contents of the editor
   * @param {object} event event data that I don't yet (Jan 13) understand yet
   */
  const handleEditorChange = (value, event) => {

  };

  return (
    <div style={{ color: TEXT_COLOR }}>
      <TopicItemContentCard 
        title={title}
        content={content}
        nXP={nXP}/>
      
      <div style={{ color: TEXT_COLOR }}>
        <CollapsibleHeadingAndListCard heading={INSTRUCTIONS_HEADING} list={instructions}/>
      </div>

      <div className="card">
        <h4>{EDITOR_HEADING}</h4>
        <div style={{borderStyle: 'solid', borderWidth: '1px', borderColor: '#ACC8F1', backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK }}>  
          <Editor 
            height='30vh'
            width='100%'
            theme='vs-dark'
            language='javascript'
            value='// Hello, there!'
            onChange={handleEditorChange}/>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button style={buttonStyle} type="button">{RESET_BUTTON_TEXT}</button>
          <button style={buttonStyle} type="button">{SUBMIT_BUTTON_TEXT}</button>
        </div>
        
        <br/>
        <h4>{CONSOLE_HEADING}</h4>
        <p style={{borderStyle: 'solid', borderWidth: '1px', borderColor: TEXT_COLOR, padding: DEFAULT_PADDING }}>Console Output</p>
      </div>

      <div style={{ color: TEXT_COLOR }}>
        <CollapsibleHeadingAndListCard heading={HINTS_HEADING} list={hints} closedByDefault={true}/>
      </div>
    </div>
  );
}

export default CQView;