import React from "react";
import { useLocation, useParams, Link } from 'react-router-dom';
import LearningTrackScreenViewModel from "./LearningTrackScreenViewModel";

import BackButtonNavbar from "../components/BackButtonNavbar";
import LearningTrackDetailsCard from "../components/LearningTrackDetailsCard";
import ProgressCard from "../components/ProgressCard";
import CourseListCard from "../components/CourseListCard";
import InstructorsCard from "../components/InstructorsCard";
import RewardsCard from "../components/RewardsCard";

import { rewardTypes } from "../../modelsAndData/enums";

import headerIcon from '../assets/hexagons_Prosymbols_Premium.png';
import forwardIcon from '../assets/next.png';
import infoIcon from '../assets/polygon_riajulislam.png';

/* const location = useLocation(); // { state {from, ...}, pathname "/example", hash "#example", search "?ex=2" } */


export default function LearningTrackScreen() {

  const NAVBAR_TEXT = "Learning Track";
  const PREVIOUS_PAGE = "/tracks";
  const HOURS_PER_COURSE = 4;
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
  
  const { trackId } = useParams();
  const { trackDetails, courseSummaries, getTrackDetailsData, getCourseSummariesData, badges, getAllBadgesInLearningTrack, } = LearningTrackScreenViewModel();
  
  // if trackDetailsState is empty, CollapsibleParagraph throws a TypeError
  const [trackDetailsState, setTrackDetailsState] = React.useState({});
  const [courseSummariesState, setCourseSummariesState] = React.useState([]);
  const [badgesState, setBadgesState] = React.useState([]);

  React.useEffect(() => {
    getTrackDetailsData(trackId);
    getCourseSummariesData(trackId);
    getAllBadgesInLearningTrack(trackId);
  }, []);

  React.useEffect(() => {
    trackDetails && Object.keys(trackDetails).length != 0
      ? setTrackDetailsState(trackDetails) 
      : setTrackDetailsState({});
    courseSummaries && courseSummaries.length != 0
      ? setCourseSummariesState(courseSummaries) 
      : setCourseSummariesState([])
    badges && courseSummaries.length != 0
      ? setBadgesState(badges)
      : setBadgesState([]);
  }, [trackDetails, courseSummaries, badges]);

  console.log('on LearningTrackScreen');

  return (
    <>
      <BackButtonNavbar title={NAVBAR_TEXT} to={PREVIOUS_PAGE}/> 

      <LearningTrackDetailsCard 
        title={trackDetailsState.title}
        longDescription={trackDetailsState.longDescription}
        nHours={trackDetailsState.nHours}
        nCourses={trackDetailsState.nCourses} /> 

      {/* wrapping in ternary operator handles case when progressInfo is null */}
      {trackDetailsState.progressInfo
        ? <ProgressCard 
            isForLearningTrack={true}
            nInProgress={0}
            percentage={trackDetailsState.progressInfo.percentage}
            nComplete={Math.round( ( trackDetailsState.progressInfo.percentage / 100) * trackDetailsState.progressInfo.nCourses )}
            nTotal={trackDetailsState.progressInfo.nCourses}/> 
        : null}   

      <CourseListCard 
        courses={courseSummariesState}
        viewModeNextPageUrlStem={"/course"} />

      {/* <InstructorsCard 
        mainIconSize={"20px"}
        itemIconSize={"20px"}
        instructors={instructorsData}/> */}

      <RewardsCard 
        mainIconSize={"20px"}
        itemIconSize={"60px"}
        badges={badgesState}/>
    </>
  );
}

/*  
    details:
    {
      title: "Learning Track Title",
      longDescription: "Learning Track Long Description. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",  // 367 characters
      nHours: 16,
      nCourses: 4
    }


    courses
    [
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


    // const location = useLocation();
    // const { payload } = location.state;
    // payload.nHours = payload.nCourses * HOURS_PER_COURSE;


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