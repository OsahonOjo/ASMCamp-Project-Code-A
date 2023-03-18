import React from 'react';
import { Link } from 'react-router-dom';
import AllLearningTracksScreenViewModel from './AllLearningTracksScreenViewModel';

import BackButtonNavbar from "../components/BackButtonNavbar";
import LearningTrackSummaryCard from "../components/LearningTrackSummaryCard";
import IconAndTextListItem from '../components/IconAndTextListItem';
import FontIconAndTextListItem from '../components/FontIconAndTextListItem';

import mainIcon from '../assets/hexagons_Prosymbols_Premium.png';
import editIcon from '../assets/pen_alkhalifi_design.png';
import nextPageIcon from '../assets/next.png';

import '../components/styles/icon.css';
import '../components/styles/card.css';
import { styles } from '../components/styles/commonDisplayStyles';

import { constants } from '../../modelsAndData/constants';

export default function ManageLearningTracksScreen() {

  const NAVBAR_TEXT = "Manage Learning Tracks";
  const NEW_TRACK_TEXT = "Create New Learning Track";
  const PREVIOUS_PAGE_URL = "/instructors";
  const NEXT_PAGE_URL_STEM = "/instructors/edit/track"; // /:trackId -> /0, /:trackId
  const EDIT_MODE = true;
  // const shortDescription = "Learning Track Short Description. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor am";  // 160 characters
  const ICON_SIZE = "20px";
  const iconAndTextListItemStyle = {
		iconSize: {
			height: ICON_SIZE,
			width: ICON_SIZE
		},
    displayInline: true
	};
  // const learningTracksSummaryData = [
  //   {
  //     id: "kblyvtrjxt66789",
  //     title: "Learning Track Alpha",
  //     shortDescription: shortDescription,
  //     nCourses: 2
  //   },
  //   {
  //     id: "574648kvjjx5689kkl",
  //     title: "Learning Track Obsidian",
  //     shortDescription: shortDescription,
  //     nCourses: 2
  //   },
  //   {
  //     id: "574648kvjjx5689kklkblyvtrjxt66789",
  //     title: "Learning Track Ruby",
  //     shortDescription: shortDescription,
  //     nCourses: 2
  //   }
  // ];

  const { learningTrackSummaries, getLearningTrackSummaries } = AllLearningTracksScreenViewModel();
  const [summaries, setSummaries] = React.useState([]);

  React.useEffect(() => { getLearningTrackSummaries() }, []);

  React.useEffect(() => {
    learningTrackSummaries ? setSummaries(learningTrackSummaries) : setSummaries([]);
  }, [learningTrackSummaries]);

  const { PRIMARY_TEXT_COLOR_DARK } = constants;
  const TEXT_COLOR = PRIMARY_TEXT_COLOR_DARK;
  const DEFAULT_MARGIN = '10px';
  const FONT_ICON_AND_TEXT_SEPARATION = '10px';

  return (
    <div>
      <BackButtonNavbar title={NAVBAR_TEXT} to={PREVIOUS_PAGE_URL} />

      {summaries.map(track => 
        <div key={track.title}>
          <LearningTrackSummaryCard 
            trackDetails={{ 
              trackId: track.id, 
              title: track.title, 
              shortDescription: track.shortDescription,
              nCourses: track.nCourses }}
            editMode={EDIT_MODE} 
            to={`${NEXT_PAGE_URL_STEM}/${track.id}`}/>
        </div>
      )}

{/* 
const mainIcon = 
    <span style={{ marginRight: MAIN_ICON_MARGIN_RIGHT }}>
      <i className="fa fa-road" style={styles.mainIcon24pxFont}></i>
    </span>; */}

      <div className="card">
        <Link 
          to={`${NEXT_PAGE_URL_STEM}/0`}>
            {/* <IconAndTextListItem icon={mainIcon} text={NEW_TRACK_TEXT} style={iconAndTextListItemStyle}/>   */}
            <FontIconAndTextListItem 
              iFontIcon={{
                className: "fa fa-road",
                style: {
                  ...styles.mainIcon24pxFont,
                  marginRight: FONT_ICON_AND_TEXT_SEPARATION,
                  color: '#444'
                }
              }}
              text={{
                content: NEW_TRACK_TEXT,
                style: {
                  color: TEXT_COLOR,
                }
              }}
              containerStyle={{
                // padding: DEFAULT_PADDING,
                display: 'inline',
                ...styles.h3SizeAndWeight
              }}/>
            {/* <img src={nextPageIcon} alt="next page icon" className="icon--20px"/> */}
        </Link> 
      </div>
    </div>
  );
}