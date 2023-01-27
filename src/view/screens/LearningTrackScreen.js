import React from "react";
import { useLocation, Link } from 'react-router-dom';

import BackButtonNavbar from "../components/BackButtonNavbar";
import LearningTrackDetailsCard from "../components/LearningTrackDetailsCard";
import ProgressCard from "../components/ProgressCard";
import CourseListCard from "../components/CourseListCard";
import InstructorsCard from "../components/InstructorsCard";
import RewardsCard from "../components/RewardsCard";

import { rewardTypes } from "../../model/enums";

import headerIcon from '../assets/hexagons_Prosymbols_Premium.png';
import forwardIcon from '../assets/next.png';
import infoIcon from '../assets/polygon_riajulislam.png';

/* const location = useLocation(); // { state {from, ...}, pathname "/example", hash "#example", search "?ex=2" } */


export default function LearningTrackScreen() {

  const NAVBAR_TEXT = "Learning Track";
  const PREVIOUS_PAGE_URL = "/tracks";
  const instructorsData = [
    {
      icon: headerIcon,
      name: "Alexander Horfius"
    },
    {
      icon: headerIcon,
      name: "Virgil Hawkins"
    }
  ];
  const rewardsData = [
    {
      type: rewardTypes.BADGE,
      name: "Expertise",
      criteria: "Complete 'Learning Track Alpha'",
      isComplete: true
    },
    {
      type: rewardTypes.BADGE,
      name: "First Steps",
      criteria: "Complete one topic item in 'Learning Track Alpha'",
      isComplete: true
    },
    {
      type: rewardTypes.BADGE,
      name: "Made it Halfway",
      criteria: "Halfway through 'Learning Track Alpha'",
      isComplete: false
    }
  ];
  
  const location = useLocation();
  const { trackId } = location.state;
  const trackIdRef = React.useRef(trackId);

  // 

  const [trackDetails, setTrackDetails] = React.useState({
    title: "Learning Track Title",
    longDescription: "Learning Track Long Description. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",  // 367 characters
    nHours: 16,
    nCourses: 4
  });
  const [courseSummaries, setCourseSummaries] = React.useState([
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
  ]);
  
  return (
    <>
      <BackButtonNavbar title={NAVBAR_TEXT} to={PREVIOUS_PAGE_URL}/> 

      <LearningTrackDetailsCard 
        title={trackDetails.title}
        longDescription={trackDetails.longDescription}
        nHours={trackDetails.nHours}
        nCourses={trackDetails.nCourses} /> 

      <ProgressCard 
        isForLearningTrack={true}
        nInProgress={1}
        nComplete={2}
        nTotal={4}/>    

      <CourseListCard courses={courseSummaries}/>

      <InstructorsCard 
        mainIconSize={"20px"}
        itemIconSize={"20px"}
        instructors={instructorsData}/>

      <RewardsCard 
        mainIconSize={"20px"}
        itemIconSize={"20px"}
        rewards={rewardsData}/>
    </>
  );
}

/*
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
      ]
    };
*/