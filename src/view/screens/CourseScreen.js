import React from "react";
import { useLocation, useParams } from 'react-router-dom';
import CourseScreenViewModel from "./CourseScreenViewModel";

import BackButtonNavbar from "../components/BackButtonNavbar";
import CourseDetailsCard from "../components/CourseDetailsCard";
import ProgressCard from "../components/ProgressCard";
import TopicsListCard from "../components/TopicsListCard";

/** A React.js component that represents an entire screen on which information about a
 *  course is displayed. This information includes the course's title and description, 
 *  the logged-in user's progress towards completing the course, as well as lists of the topics
 *  that comprise the course and sublists of the topic items that comprise each of those
 *  topics. 
 */

export default function CourseScreen() {

  const NAVBAR_TEXT = "Course";
  const { courseId } = useParams();

  const { courseDetails, topicsAndTopicItems, getCourseDetailsData, getTopicsAndTopicItemsData } = CourseScreenViewModel();

  const [loading, setLoading] = React.useState(true);
  const [courseDetailsState, setCourseDetailsState] = React.useState({});
  const [topicsAndTopicItemsState, setTopicsAndTopicItemsState] = React.useState([]);

  const PREVIOUS_PAGE = `/track/${courseDetailsState.learningTrackId}`;

  React.useEffect(() => {
    getCourseDetailsData(courseId);
    getTopicsAndTopicItemsData(courseId);
    setLoading(true);
  }, []);

  React.useEffect(() => {
    if (courseDetails) 
      setCourseDetailsState(courseDetails);
    if (topicsAndTopicItems)
      setTopicsAndTopicItemsState(topicsAndTopicItems);
    if (courseDetails && topicsAndTopicItems)
      setLoading(false);
  }, [courseDetails, topicsAndTopicItems]);

  
  return (
    <>
      <BackButtonNavbar title={NAVBAR_TEXT} to={PREVIOUS_PAGE} disabled={loading ? true : false}/>

      <CourseDetailsCard 
        title={courseDetailsState.title}
        learningTrackTitle={courseDetailsState.learningTrackTitle}
        longDescription={courseDetailsState.longDescription}
        nHours={courseDetailsState.nHours}
        nXP={courseDetailsState.xp}
        nLessons={courseDetailsState.nLessons}
        nQuestions={courseDetailsState.nQuestions}
        userIsEnrolled={courseDetailsState.userIsEnrolled}/>

      {/* wrapping in ternary operator handles case when progressInfo is null */}
      {courseDetailsState.progressInfo
        ? <ProgressCard 
            isForLearningTrack={false}
            nInProgress={0}
            percentage={courseDetailsState.progressInfo.percentage}
            nComplete={Math.round( (courseDetailsState.progressInfo.percentage / 100) * courseDetailsState.progressInfo.nTopics )}
            nTotal={courseDetailsState.progressInfo.nTopics}/> 
        : null}      

      {/** TODO: remove <details> from TopicsListCard  */}
      <TopicsListCard 
        topicsData={topicsAndTopicItemsState}
        userIsEnrolled={false}/>
    </>
  );
}

/*
    const courseData = { 
      title: "Course Title", 
      learningTrackTitle: "Learning Track Title", 
      longDescription: "Learning Track Long Description. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",  // 367 characters
      nHours: 4, 
      nXP: 2700, 
      nLessons: 7, 
      nQuestions: 7, 
      userIsEnrolled: true,
      topics: [
        {
          title: "Topic 1",
          shortDescription: "Short description. Lorem ipsum.",
          xp: 1200,
          topicItems: [
            {
              type: "LSN",
              title: "Lesson 1",
              xp: 200
            },
            {
              type: "MCQ",
              title: "MCQ Question",
              xp: 200,
            },
            {
              type: "TFQ",
              title: "TFQ Question",
              xp: 200
            },
            {
              type: "LSN",
              title: "Lesson 2",
              xp: 200
            },
            {
              type: "SAQ",
              title: "SAQ Question",
              xp: 200
            },
            {
              type: "CQ",
              title: "CQ Question",
              xp: 200
            }
          ]
        },
        {
          title: "Topic 2",
          shortDescription: "Short description. Lorem ipsum.",
          xp: 900,
          topicItems: [
            {
              type: "LSN",
              title: "Lesson A",
              xp: 200
            },
            {
              type: "LSN",
              title: "Lesson B",
              xp: 300
            },
            {
              type: "SAQ",
              title: "SAQ Question",
              xp: 100
            },
            {
              type: "CQ",
              title: "CQ Question",
              xp: 300
            }
          ]
        },
        {
          title: "Topic 3",
          shortDescription: "Short description. Lorem ipsum.",
          xp: 600,
          topicItems: [
            {
              type: "LSN",
              title: "Lesson I",
              xp: 200
            },
            {
              type: "CQ",
              title: "CQ Question",
              xp: 400
            }
          ]
        }
      ]
    };
*/