import React from "react";
import PropTypes from 'prop-types';
import { Link, useLocation } from "react-router-dom";

import CourseSummaryCard from "./CourseSummaryCard";
import IconAndTextListItem from "./IconAndTextListItem";
import FontIconAndTextListItem from "./FontIconAndTextListItem";

import mainIcon from '../assets/hexagons_Prosymbols_Premium.png';
import bulletIcon from "../assets/cell_Freepik.png";

import './styles/icon.css';
import './styles/card.css';
import { styles } from "./styles/commonDisplayStyles";

import { constants } from "../../modelsAndData/constants";

export default function CourseListCard({ courses, viewModeNextPageUrlStem, editMode, editModeNextPageUrlStem, learningTrackId }) {

  const NEW_COURSE_TEXT = "Create New Course";
  const ICON_SIZE = "20px";

  const { PRIMARY_TEXT_COLOR_DARK } = constants;
  const TEXT_COLOR = PRIMARY_TEXT_COLOR_DARK;

  const FONT_ICON_AND_TEXT_SEPARATION = '10px';
  const LEFT_SPACE_DEFAULT = '10px';  // "SPACE" being either padding or margin
  const DEFAULT_MARGIN = '10px';

  const location = useLocation();

  const iconAndTextListItemStyle = {
		iconSize: {
			height: ICON_SIZE,
			width: ICON_SIZE
		},
    displayInline: true
	};

  const viewModeLinkIconMargins = {
    // marginTop: '0px',
    marginLeft: '80px',
    // paddingTop: '10px'
  };

// <span className="material-symbols-outlined" style={styles.mainIcon24pxFont}>collections_bookmark</span>

  const newCourseElement = 
    <div>
      <hr />
      <Link 
        to={`${editModeNextPageUrlStem}/0`}
        state={{ from: location.pathname, learningTrackId: learningTrackId }} >
          {/* <IconAndTextListItem icon={mainIcon} text={NEW_COURSE_TEXT} style={iconAndTextListItemStyle}/>   */}
          {/* <span className="material-symbols-outlined">navigate_next</span> */}
          <div style={{ display: 'flex' }}>
            <FontIconAndTextListItem 
              spanFontIcon={{
                className: "material-symbols-outlined",
                content: "collections_bookmark",
                style: {
                  ...styles.mainIcon24pxFont,
                  marginRight: FONT_ICON_AND_TEXT_SEPARATION,
                  color: '#444'
                }
              }}
              text={{
                content: NEW_COURSE_TEXT,
                style: {
                  color: TEXT_COLOR,
                  ...styles.h4SizeAndWeight
                }
              }}
              containerStyle={{
                // padding: DEFAULT_PADDING,
                display: 'inline'
              }}/>
              <div>
                <span className="material-symbols-outlined" style={{ ...styles.icon40pxFont, ...viewModeLinkIconMargins, color: TEXT_COLOR }}>
                  navigate_next
                </span>
              </div>
          </div>
            {/* <span className="material-symbols-outlined" style={{ ...styles.icon30pxFont, ...viewModeLinkIconMargins, color: TEXT_COLOR, borderStyle: 'solid', borderColor: '1px', borderColor: 'black' }}>
              navigate_next
            </span> */}
      </Link> 
    </div>;

  return (
    <>
      <div className="card">

        <div style={{ margin: DEFAULT_MARGIN, marginLeft: '0px' }}>
          <span className="material-symbols-outlined" style={styles.mainIcon24pxFont}>collections_bookmark</span>
          <span style={{ marginLeft: LEFT_SPACE_DEFAULT, ...styles.h3SizeAndWeight, color: TEXT_COLOR }}>Courses</span>
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

        <br/>

      </div>
    </>
  );
}

CourseListCard.propTypes = {
  courses: PropTypes.array
};

// const EDIT_MODE_NEXT_PAGE_URL = "/instructors/edit/course";
// const NORMAL_MODE_NEXT_PAGE_URL = `/course/${courseId}`;
// const NEXT_PAGE_URL = editMode ? EDIT_MODE_NEXT_PAGE_URL : NORMAL_MODE_NEXT_PAGE_URL;