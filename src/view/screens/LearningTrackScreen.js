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

  // TODO
  // 1. populate instructors card from trackDetails
  // 2. replace "Loading" text with spinners

  const NAVBAR_TEXT = "Learning Track";
  const PREVIOUS_PAGE_URL = "/tracks";

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
  
  const { trackId } = useParams();
  
  const [ trackDetailsLoading, setTrackDetailsLoading ] = React.useState(true);
  const [ courseSummariesLoading, setCourseSummariesLoading ] = React.useState(true);
  const [ badgesLoading, setBadgesLoading ] = React.useState(true);

  // if trackDetails is empty, CollapsibleParagraph throws a TypeError
  const [ trackDetails, setTrackDetails ] = React.useState({});
  const [ courseSummaries, setCourseSummaries ] = React.useState([]);
  const [ badges, setBadges ] = React.useState([]);

  React.useEffect(() => {
    const { getTrackDetailsData, getCourseSummariesData, getAllBadgesInLearningTrack } = LearningTrackScreenViewModel();

    getTrackDetailsData(trackId)
      .then((details) => {
        setTrackDetails(details);
        setTrackDetailsLoading(false);
      })
      .catch((error) => { 
        console.log(error);
        setTrackDetailsLoading(true);
      });

    getCourseSummariesData(trackId)
      .then((summaries) => {
        setCourseSummaries(summaries);
        setCourseSummariesLoading(false);
      })
      .catch((error) => { 
        console.log(error);
        setCourseSummariesLoading(true);
      });

    getAllBadgesInLearningTrack(trackId)
      .then((badges) => {
        setBadges(badges);
        setBadgesLoading(false);
      })
      .catch((error) => { 
        console.log(error);
        setBadgesLoading(true);
      });
  }, []);

  // React.useEffect(() => {
  //   trackDetails && Object.keys(trackDetails).length != 0
  //     ? setTrackDetails(trackDetails) 
  //     : setTrackDetails({});
  //   courseSummaries && courseSummaries.length != 0
  //     ? setCourseSummaries(courseSummaries) 
  //     : setCourseSummaries([])
  //   badges && courseSummaries.length != 0
  //     ? setBadges(badges)
  //     : setBadges([]);
  // }, [trackDetails, courseSummaries, badges]);

  return (
    <>
      <BackButtonNavbar title={NAVBAR_TEXT} to={PREVIOUS_PAGE_URL}/> 

      {trackDetailsLoading
        ? <code>Loading</code>
        : <>
            <LearningTrackDetailsCard 
              title={trackDetails.title}
              longDescription={trackDetails.longDescription}
              nHours={trackDetails.nHours}
              nCourses={trackDetails.nCourses} />

            {trackDetails.progressInfo
              ? <ProgressCard 
                  isForLearningTrack={true}
                  nInProgress={0}
                  percentage={trackDetails.progressInfo.percentage}
                  nComplete={Math.round( ( trackDetails.progressInfo.percentage / 100) * trackDetails.progressInfo.nCourses )}
                  nTotal={trackDetails.progressInfo.nCourses}/> 
              : null}

            {courseSummariesLoading
              ? <code>Loading Courses</code>
              : <CourseListCard 
                  courses={courseSummaries}
                  viewModeNextPageUrlStem={"/course"} />}

            {/* Should be populated from trackDetails */}
            <InstructorsCard 
              mainIconSize={"20px"}
              itemIconSize={"20px"}
              instructors={instructorsData}/>

            {badgesLoading
              ? <code>Loading Badges</code>
              : <RewardsCard 
                  mainIconSize={"20px"}
                  itemIconSize={"60px"}
                  badges={badges}/>}
          </>}
    </>
  );
}

/*  

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