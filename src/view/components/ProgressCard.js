import React from "react";
import PropTypes from 'prop-types';

import ProgressBar from "./ProgressBar";
import IconAndTextListItem from "./IconAndTextListItem";

import mainCardIcon from '../assets/hexagons_Prosymbols_Premium.png';
import bulletIcon from "../assets/cell_Freepik.png";

import './styles/card.css';
import './styles/icon.css';
import { commonDisplayStyles } from "./styles/commonDisplayStyles";

function ProgressCard({ isForLearningTrack, nInProgress, percentage, nComplete, nTotal }) {

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
	const COURSES_COMPLETE = `${nInProgress}/${nTotal} ${isForLearningTrack ? COURSES : TOPICS} Complete`;
	const COURSES_IN_PROGRESS = `${nComplete}/${nTotal} ${isForLearningTrack ? COURSES : TOPICS} In Progress`;
	const calcPercentage = () => Math.round( (nComplete / nTotal) * 100 );

	return (

		<div className="card card--clicakble">

			<div>
				<i className="fa fa-tachometer" style={commonDisplayStyles.icon24Style}></i>
				<span>Progress</span>
				<img src={bulletIcon} alt="main card icon" className="icon--10px"/>
			</div>

			<div style={commonDisplayStyles.indented}>
				{<ProgressBar 
					percentage={percentage}
					hasLabel={true}
					labelOnRightSide={false} />}

				{/* {<IconAndTextListItem 
					icon={bulletIcon}
					text={COURSES_IN_PROGRESS}
					style={iconAndTextListItemStyle}/>} */}

				{<IconAndTextListItem 
					icon={bulletIcon}
					text={COURSES_COMPLETE}
					style={iconAndTextListItemStyle}/>}

			</div>

		</div>

	);
}

ProgressCard.propTypes = {
	isForLearningTrack: PropTypes.bool, 
	nInProgress: PropTypes.number,
	nComplete: PropTypes.number,
	nTotal: PropTypes.number
};

export default ProgressCard;