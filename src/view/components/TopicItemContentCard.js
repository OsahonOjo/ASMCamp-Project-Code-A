import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

import Tag from './Tag';

import './styles/card.css';
import { styles } from './styles/commonDisplayStyles';
import { constants } from '../../modelsAndData/constants';

export default function TopicItemContentCard({ title, content, nXP }) {

  const TAG_TEXT = `${nXP} XP`;
  const MAIN_ICON_MARGIN_RIGHT = '10px';
  const FONT_ICON_AND_TEXT_SEPARATION = '10px';
  const DEFAULT_MARGIN = '10px';
  const BODY_TEXT_RIGHT_MARGIN = '30px';

  const { PRIMARY_TEXT_COLOR_DARK } = constants;
  const TEXT_COLOR = PRIMARY_TEXT_COLOR_DARK;
  
  const TAG_BORDER_WIDTH = "1px";
  const TAG_BORDER_COLOR = "black";
  const TAG_FONT_SIZE = "20px";

  const cleanContent = DOMPurify.sanitize(marked.parse(content));  
  const contentRef = React.useRef(null);
  
  React.useEffect(() => {
    contentRef.current.innerHTML = cleanContent;
  }, []);
 
  return (
    <div className='card' style={{ color: TEXT_COLOR }}>
      <div>
        <h4 style={styles.inline}>{title}</h4>
        <Tag 
          text={{
            content: TAG_TEXT,
            style: { 
              color: TEXT_COLOR,
              fontSize: TAG_FONT_SIZE
            }
          }} 
          container={{
            baseStyle: { 
              display: 'inline',
              borderWidth: TAG_BORDER_WIDTH,
              borderColor: TEXT_COLOR
            },
            otherStyle: {
              marginLeft: DEFAULT_MARGIN,
              padding: '2px',
              borderRadius: '5px'
            }
          }} />
      </div>
      <br/>
      <div>
        <div ref={contentRef} style={{ fontSize: '18px' }}></div>
      </div>
    </div>
  );
}