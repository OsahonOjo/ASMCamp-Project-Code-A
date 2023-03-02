import React from "react";
import PropTypes from 'prop-types';
import { Link, useLocation } from "react-router-dom";

import CourseSummaryCard from "./CourseSummaryCard";
import IconAndTextListItem from "./IconAndTextListItem";

import mainIcon from '../assets/hexagons_Prosymbols_Premium.png';
import bulletIcon from "../assets/cell_Freepik.png";

import './styles/icon.css';
import './styles/card.css';
import { commonDisplayStyles } from "./styles/commonDisplayStyles";

function CourseListCard({ courses, viewModeNextPageUrlStem, editMode, editModeNextPageUrlStem, learningTrackId }) {

  // const EDIT_MODE_NEXT_PAGE_URL = "/instructors/edit/course";
  // const NORMAL_MODE_NEXT_PAGE_URL = `/course/${courseId}`;
  // const NEXT_PAGE_URL = editMode ? EDIT_MODE_NEXT_PAGE_URL : NORMAL_MODE_NEXT_PAGE_URL;
  
  const NEW_COURSE_TEXT = "Create New Course";
  const ICON_SIZE = "20px";
  const iconAndTextListItemStyle = {
		iconSize: {
			height: ICON_SIZE,
			width: ICON_SIZE
		},
    displayInline: true
	};

  const location = useLocation();

  const newCourseElement = 
    <div>
      <hr />
      <Link 
        to={`${editModeNextPageUrlStem}/0`}
        state={{ from: location.pathname, learningTrackId: learningTrackId }} >
          <IconAndTextListItem icon={mainIcon} text={NEW_COURSE_TEXT} style={iconAndTextListItemStyle}/>  
          <span className="material-symbols-outlined">navigate_next</span>
      </Link> 
    </div>;

  return (
    <>
      <div className="card">

        <div>
          <span className="material-symbols-outlined" style={commonDisplayStyles.icon24Style}>collections_bookmark</span>
          <span>Courses</span>
          <img src={bulletIcon} alt="main card icon" className="icon--10px"/>
        </div>

        {courses.map(course => 
          <CourseSummaryCard 
            key={course.id}
            courseId={course.id}
            learningTrackId={course.learningTrackId}
            title={course.title}
            shortDescription={course.shortDescription}
            nHours={course.nHours}
            userIsEnrolled={course.userIsEnrolled}
            percentage={course.percentage}
            hasLabel={true}
            labelOnRightSide={false}
            editMode={editMode}
            nextPageUrl={editMode ? `${editModeNextPageUrlStem}/${course.id}` : `${viewModeNextPageUrlStem}/${course.id}`} />)}

        {editMode ? newCourseElement : null}
      </div>
    </>
  );
}

CourseListCard.propTypes = {
  courses: PropTypes.array
};

export default CourseListCard;