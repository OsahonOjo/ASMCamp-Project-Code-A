import React from "react";
import { useLocation, Link } from 'react-router-dom';

import BackButtonNavbar from "../components/BackButtonNavbar";
import LearningTrackDetailsCard from "../components/LearningTrackDetailsCard";
import ProgressCard from "../components/ProgressCard";
import CourseListCard from "../components/CourseListCard";
import InstructorsCard from "../components/InstructorsCard";
import RewardsCard from "../components/RewardsCard";

import headerIcon from '../assets/hexagons_Prosymbols_Premium.png';
import forwardIcon from '../assets/next.png';
import infoIcon from '../assets/polygon_riajulislam.png';

/* const location = useLocation(); // { state {from, ...}, pathname "/example", hash "#example", search "?ex=2" } */


function LearningTrackScreen() {

  const NAVBAR_TEXT = "Learning Track";
  const PREVIOUS_PAGE_URL = "/tracks";
  const learningTrackData = {
    title: "Learning Track Title",
    longDescription: "Learning Track Long Description. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",  // 367 characters
    nHours: 16,
    nCourses: 4,
    userIsEnrolled: true,
    courses: [
      {
        title: "Course Title",
        shortDescription: "Course Short Description. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet conse",  // 160 characters
        nHours: 4,
        userIsEnrolled: true,
        percentage: 42
      },
      {
        title: "Course Title",
        shortDescription: "Course Short Description. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet conse",  // 160 characters
        nHours: 4,
        userIsEnrolled: true,
        percentage: 12
      },
      {
        title: "Course Title",
        shortDescription: "Course Short Description. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet conse",  // 160 characters
        nHours: 4,
        userIsEnrolled: false,
        percentage: 98
      },
      {
        title: "Course Title",
        shortDescription: "Course Short Description. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet conse",  // 160 characters
        nHours: 4,
        userIsEnrolled: true,
        percentage: 52
      }
    ],
    instructors: [
      {
        icon: headerIcon,
        name: "Alexander Horfius"
      },
      {
        icon: headerIcon,
        name: "Virgil Hawkins"
      }
    ],
    rewards: [
      {
        type: "BADGE",
        name: "Expertise",
        criteria: "Complete 'Learning Track Alpha'",
        complete: false
      }
    ]
  };
  
  return (
    <>
      <BackButtonNavbar title={NAVBAR_TEXT} to={PREVIOUS_PAGE_URL}/> 

      <LearningTrackDetailsCard 
        title={learningTrackData.title}
        description={learningTrackData.longDescription}
        nHours={learningTrackData.nHours}
        nCourses={learningTrackData.nCourses}
        userIsEnrolled={learningTrackData.userIsEnrolled}/> 

      <ProgressCard 
        isForLearningTrack={true}
        nInProgress={1}
        nComplete={2}
        nTotal={learningTrackData.nCourses}/>    

      <CourseListCard courses={learningTrackData.courses}/>

      <InstructorsCard 
        mainIconSize={"20px"}
        itemIconSize={"20px"}
        instructors={learningTrackData.instructors}/>

      <RewardsCard 
        mainIconSize={"20px"}
        itemIconSize={"20px"}
        rewards={[]}/>
    </>
  );
}

export default LearningTrackScreen;