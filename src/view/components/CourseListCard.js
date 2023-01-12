import React from "react";
import PropTypes from 'prop-types';

import CourseSummaryCard from "./CourseSummaryCard";

import mainCardIcon from '../assets/hexagons_Prosymbols_Premium.png';
import bulletIcon from "../assets/cell_Freepik.png";

import './styles/icon.css';
import './styles/card.css';

function CourseListCard({ courses }) {

  return (
    <>
      <details open className="card card--clickable">

        <summary>
          <img src={mainCardIcon} alt="main card icon" className="icon--30px"/>
					<span>Courses</span>
					<img src={bulletIcon} alt="main card icon" className="icon--10px"/>
        </summary>

        {courses.map(course => 
          <CourseSummaryCard 
            key={course.percentage}
            title={course.title}
            shortDescription={course.shortDescription}
            nHours={course.nHours}
            userIsEnrolled={course.userIsEnrolled}
            percentage={course.percentage}
            hasLabel={true}
            labelOnRightSide={false}/>)}
      </details>
    </>
  );
}

CourseListCard.propTypes = {
  courses: PropTypes.array
};

export default CourseListCard;