import React from "react";
import PropTypes from 'prop-types';

import ProgressBar from "./ProgressBar";
import IconAndTextListItem from "./IconAndTextListItem";

import mainCardIcon from '../assets/hexagons_Prosymbols_Premium.png';
import bulletIcon from "../assets/cell_Freepik.png";

import './styles/card.css';
import './styles/icon.css';
import { commonDisplayStyles } from "./styles/commonDisplayStyles";

function ProgressCard({ isForLearningTrack, nInProgress, nComplete, nTotal }) {

	const [state, setState] = React.useState({ open: true });
	const BULLET_ICON_SIZE = '10px';
	const iconAndTextListItemStyle = {
		iconSize: {
			height: BULLET_ICON_SIZE,
			width: BULLET_ICON_SIZE
		}
	};
	const COURSES = "Courses";
	const TOPICS = "Topics";
	const COURSES_COMPLETE = `${nInProgress}/${nTotal} ${isForLearningTrack ? COURSES : TOPICS} In Progress`;
	const COURSES_IN_PROGRESS = `${nComplete}/${nTotal} ${isForLearningTrack ? COURSES : TOPICS} Complete`;
	const calcPercentage = () => Math.round( (nComplete / nTotal) * 100 );

	return (

		<details open={state.open} className="card card--clicakble">

			<summary>
				<img src={mainCardIcon} alt="main card icon" className="icon--30px"/>
				<span>Progress</span>
				<img src={bulletIcon} alt="main card icon" className="icon--10px"/>
			</summary>

			<div style={commonDisplayStyles.indented}>
				{<ProgressBar 
					percentage={calcPercentage()}
					hasLabel={true}
					labelOnRightSide={false} />}

				{<IconAndTextListItem 
					icon={bulletIcon}
					text={COURSES_COMPLETE}
					style={iconAndTextListItemStyle}/>}

				{<IconAndTextListItem 
					icon={bulletIcon}
					text={COURSES_IN_PROGRESS}
					style={iconAndTextListItemStyle}/>}

			</div>

		</details>

	);
}

ProgressCard.propTypes = {
	isForLearningTrack: PropTypes.bool, 
	nInProgress: PropTypes.number,
	nComplete: PropTypes.number,
	nTotal: PropTypes.number
};

export default ProgressCard;