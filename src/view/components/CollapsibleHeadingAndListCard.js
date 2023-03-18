import bulletIcon from "../assets/cell_Freepik.png";

import './styles/card.css';
import './styles/icon.css';
import { styles } from './styles/commonDisplayStyles';

function CollapsibleHeadingAndListCard({ heading, list, closedByDefault }) {

  return (
    <details open={closedByDefault ? false : true} className="card">
      <summary>
        <h4 style={styles.inline}>{heading}</h4>
				<img src={bulletIcon} alt="main card icon" className="icon--10px"/>
      </summary>
      <hr />
      <ul>
        {list.map(item => <li key={item}><p>{item}</p></li>)}
      </ul>
    </details>
  );
}

export default CollapsibleHeadingAndListCard;