import { Link } from 'react-router-dom';

import BackButtonNavbar from "../components/BackButtonNavbar";
import LearningTrackSummaryCard from "../components/LearningTrackSummaryCard";
import IconAndTextListItem from '../components/IconAndTextListItem';

import mainIcon from '../assets/hexagons_Prosymbols_Premium.png';
import editIcon from '../assets/pen_alkhalifi_design.png';
import nextPageIcon from '../assets/next.png';

import '../components/styles/icon.css';
import '../components/styles/card.css';

function ManageLearningTracksScreen() {

  const NAVBAR_TEXT = "Manage Learning Tracks";
  const NEW_TRACK_TEXT = "Create New Learning Track";
  const PREVIOUS_PAGE_URL = "/instructorsarea";
  const NEXT_PAGE_URL = "/edittrack";
  const EDIT_MODE = true;
  const shortDescription = "Learning Track Short Description. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor am";  // 160 characters
  const ICON_SIZE = "20px";
  const iconAndTextListItemStyle = {
		iconSize: {
			height: ICON_SIZE,
			width: ICON_SIZE
		},
    displayInline: true
	};
  const learningTracksSummaryData = [
    {
      title: "Learning Track Alpha",
      shortDescription: shortDescription
    },
    {
      title: "Learning Track Obsidian",
      shortDescription: shortDescription
    },
    {
      title: "Learning Track Ruby",
      shortDescription: shortDescription
    }
  ];

  return (
    <div>
      <BackButtonNavbar title={NAVBAR_TEXT} to={PREVIOUS_PAGE_URL} />

      {learningTracksSummaryData.map(track => 
        <div key={track.title}>
          <LearningTrackSummaryCard 
              title={track.title} 
              shortDescription={track.shortDescription} 
              editMode={EDIT_MODE} 
              to={NEXT_PAGE_URL}/>
        </div>)}

      <div className="card">
        <Link 
          to={NEXT_PAGE_URL}>
          <IconAndTextListItem icon={mainIcon} text={NEW_TRACK_TEXT} style={iconAndTextListItemStyle}/>  
          <img src={nextPageIcon} alt="next page icon" className="icon--20px"/>
        </Link> 
      </div>
    </div>
  );
}

export default ManageLearningTracksScreen;