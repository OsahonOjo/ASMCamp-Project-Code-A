import IconAndTextListItem from './IconAndTextListItem';

import mainIcon from '../assets/hexagons_Prosymbols_Premium.png';
import minusIcon from '../assets/minus_Pixel_perfect.png';

import { commonDisplayStyles } from './styles/commonDisplayStyles';
import './styles/card.css';
import './styles/icon.css';

function AddInstructorsCard() {

  const HEADING = "Add Instructors";
  const INSTRUCTOR_SEARCH_TEXT = "Instructor Search";
  const ADD_INSTRUCTOR_TEXT = "Add Instructor";
  const SEARCH_BUTTON_TEXT = "Search Instructor";
  const instructors = [
    "Matthew Murdock",
    "Karen Page",
    "Franklin Nelson"
  ];
  const ICON_SIZE = '20px';
  const iconAndTextListItemStyle = {
    iconSize: {
      height: ICON_SIZE,
      width: ICON_SIZE
    },
    displayInline: true
  };

  return (
    <div className='card'>
      <h4>{HEADING}</h4>
      
      <div style={commonDisplayStyles.indented}>
        {instructors.map(instructor => 
          <div key={instructor}>
            <IconAndTextListItem 
              icon={mainIcon} 
              text={instructor}
              style={iconAndTextListItemStyle}/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <img src={minusIcon} alt="minus icon" className='icon--20px'/>
          </div>)}
      </div>

      <h4>{INSTRUCTOR_SEARCH_TEXT}</h4>
      <input type="text" /><br />
      <p>Instructor Not Found</p>
      <button type="button">{ADD_INSTRUCTOR_TEXT}</button>
    </div>
  );
}

export default AddInstructorsCard;