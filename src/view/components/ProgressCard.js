import React from "react";
import PropTypes from 'prop-types';

import ProgressBar from "./ProgressBar";
import FontIconAndTextListItem from "./FontIconAndTextListItem";

import './styles/card.css';
import './styles/icon.css';
import { styles } from "./styles/commonDisplayStyles";

export default function ProgressCard({ isForLearningTrack, nInProgress, percentage, nComplete, nTotal }) {

	const TEXT_COLOR = styles.vDarkModeTextColor3;

	const MAIN_ICON_MARGIN_RIGHT = '10px';
	const BODY_TEXT_LEFT_INDENT = '43px';
	const BODY_TEXT_RIGHT_MARGIN = '30px';
	const FONT_ICON_AND_TEXT_SEPARATION = '10px';
  	const DEFAULT_MARGIN = '10px';

	const COURSES = "Courses";
	const TOPICS = "Topics";
	const COURSES_COMPLETE = `${nInProgress}/${nTotal} ${isForLearningTrack ? COURSES : TOPICS} Complete`;

	return (

		<div className="card">

			<div style={{ marginTop: DEFAULT_MARGIN }}>
				<i className="fa fa-tachometer" style={{ ...styles.mainIcon24pxFont, marginRight: MAIN_ICON_MARGIN_RIGHT }}></i>
				<span style={{ color: TEXT_COLOR, ...styles.h3SizeAndWeight }}>Progress</span>
			</div>

			<div style={{ marginLeft: BODY_TEXT_LEFT_INDENT, marginRight: BODY_TEXT_RIGHT_MARGIN }}>
				
				<br/>

				<ProgressBar 
					percentage={percentage}
					hasLabel={true}
					labelOnRightSide={false} />

				<FontIconAndTextListItem 
					spanFontIcon={{
						className: "material-symbols-outlined",
						content: "collections_bookmark",
						style: {
							...styles.listItemIcon14pxFont,
							marginRight: FONT_ICON_AND_TEXT_SEPARATION
						}
					}}
					text={{
						content: COURSES_COMPLETE,
						style: {
							color: TEXT_COLOR,
						}
					}}
					containerStyle={{
						margin: DEFAULT_MARGIN,
						marginLeft: '0px'
					}}/>

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

/*
	import mainCardIcon from '../assets/hexagons_Prosymbols_Premium.png';
	import bulletIcon from "../assets/cell_Freepik.png";

	const [state, setState] = React.useState({ open: true });
	const BULLET_ICON_SIZE = '10px'; 

	const COURSES_IN_PROGRESS = `${nComplete}/${nTotal} ${isForLearningTrack ? COURSES : TOPICS} In Progress`;
	const calcPercentage = () => Math.round( (nComplete / nTotal) * 100 );

	const iconAndTextListItemStyle = {
		iconSize: {
			height: BULLET_ICON_SIZE,
			width: BULLET_ICON_SIZE
		}
	};

	{<IconAndTextListItem 
		icon={bulletIcon}
		text={COURSES_COMPLETE}
		style={iconAndTextListItemStyle}/>}
*/