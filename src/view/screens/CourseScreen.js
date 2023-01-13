import React from "react";

import BackButtonNavbar from "../components/BackButtonNavbar";
import CourseDetailsCard from "../components/CourseDetailsCard";
import ProgressCard from "../components/ProgressCard";
import TopicsListCard from "../components/TopicsListCard";

import headerIcon from '../assets/hexagons_Prosymbols_Premium.png';
import forwardIcon from '../assets/next.png';
import infoIcon from '../assets/polygon_riajulislam.png';

import { commonDisplayStyles } from "../components/styles/commonDisplayStyles";

/** A React.js component that represents an entire screen on which information about a
 *  course is displayed. This information includes the course's title and description, 
 *  the logged-in user's progress towards completing the course, as well as lists of the topics
 *  that comprise the course and sublists of the topic items that comprise each of those
 *  topics. 
 */

function CourseScreen() {

  const NAVBAR_TEXT = "Course";
  const PREVIOUS_PAGE_URL = "/track";
  const courseData = { 
    title: "Course Title", 
    learningTrackTitle: "Learning Track Title", 
    longDescription: "Learning Track Long Description. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",  // 367 characters
    nHours: 4, 
    nXP: 1200, 
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

  return (
    <>
      <BackButtonNavbar title={NAVBAR_TEXT} to={PREVIOUS_PAGE_URL}/>

      <CourseDetailsCard 
        title={courseData.title}
        learningTrackTitle={courseData.learningTrackTitle}
        longDescription={courseData.longDescription}
        nHours={courseData.nHours}
        nXP={courseData.nXP}
        nLessons={courseData.nLessons}
        nQuestions={courseData.nQuestions}
        userIsEnrolled={courseData.userIsEnrolled}/>

      <ProgressCard 
        isForLearningTrack={false}
        nInProgress={1}
        nComplete={2}
        nTotal={courseData.topics.length}/> 

      <TopicsListCard 
        topics={courseData.topics}
        userIsEnrolled={courseData.userIsEnrolled}/>
    </>
  );
}

export default CourseScreen;
