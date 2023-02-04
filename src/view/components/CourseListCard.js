import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import CourseSummaryCard from "./CourseSummaryCard";
import IconAndTextListItem from "./IconAndTextListItem";

import mainIcon from '../assets/hexagons_Prosymbols_Premium.png';
import bulletIcon from "../assets/cell_Freepik.png";

import './styles/icon.css';
import './styles/card.css';
import { commonDisplayStyles } from "./styles/commonDisplayStyles";

function CourseListCard({ courses, editMode }) {

  const EDIT_MODE_NEXT_PAGE_URL = "/instructors/edit/course";
  const NEW_COURSE_TEXT = "Create New Course";
  const ICON_SIZE = "20px";
  const iconAndTextListItemStyle = {
		iconSize: {
			height: ICON_SIZE,
			width: ICON_SIZE
		},
    displayInline: true
	};

  const newCourseElement = 
    <div>
      <hr />
      <Link 
        to={EDIT_MODE_NEXT_PAGE_URL}>
          <IconAndTextListItem icon={mainIcon} text={NEW_COURSE_TEXT} style={iconAndTextListItemStyle}/>  
          <span className="material-symbols-outlined">navigate_next</span>
      </Link> 
    </div>;

  return (
    <>
      <details open className="card">

        <summary>
          <span className="material-symbols-outlined" style={commonDisplayStyles.icon24Style}>collections_bookmark</span>
          <span>Courses</span>
          <img src={bulletIcon} alt="main card icon" className="icon--10px"/>
        </summary>

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
            editMode={editMode}/>)}

        {editMode ? newCourseElement : null}
      </details>
    </>
  );
}

CourseListCard.propTypes = {
  courses: PropTypes.array
};

export default CourseListCard;