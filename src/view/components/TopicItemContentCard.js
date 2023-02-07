import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

import Tag from './Tag';

import './styles/card.css';
import { commonDisplayStyles } from './styles/commonDisplayStyles';

export default function TopicItemContentCard({ title, content, nXP }) {

  const TAG_TEXT = `${nXP} XP`;
  const cleanContent = DOMPurify.sanitize(marked.parse(content));  
  const contentRef = React.useRef(null);
  
  React.useEffect(() => {
    contentRef.current.innerHTML = cleanContent;
  }, []);

  return (
    <div className='card'>
      <div>
        <h4 style={commonDisplayStyles.inline}>{title}</h4>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Tag text={TAG_TEXT} displayBlock={false}/>
      </div>
      <div>
        <div ref={contentRef}></div>
      </div>
    </div>
  );
}