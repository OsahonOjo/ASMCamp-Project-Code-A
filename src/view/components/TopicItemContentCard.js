import Tag from './Tag';

import './styles/card.css';
import { commonDisplayStyles } from './styles/commonDisplayStyles';

function TopicItemContentCard({ title, content, nXP }) {

  const TAG_TEXT = `${nXP} XP`;

  return (
    <div className='card'>
      <div>
        <h4 style={commonDisplayStyles.inline}>{title}</h4>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Tag text={TAG_TEXT} displayBlock={false}/>
      </div>
      <div>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default TopicItemContentCard;