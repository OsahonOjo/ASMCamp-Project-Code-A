import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import LearningTrackScreenViewModel from "./LearningTrackScreenViewModel";
import EditLearningTrackScreenViewModel from "./EditLearningTrackScreenViewModel";

import { createTrack } from "../../model/EduDataModel";

import AddInstructorsCard from "../components/AddInstructorsCard";
import AddRewardsCard from "../components/AddRewardsCard";
import BackButtonNavbar from "../components/BackButtonNavbar";
import GenericEditEntityView from "../components/GenericEditEntityView";
import CourseListCard from "../components/CourseListCard";

import '../components/styles/card.css';

export default function EditLearningTrackScreen() {

  const NAVBAR_TEXT = "Edit Learning Track";
  const PREVIOUS_PAGE_URL = "/instructors/tracks";
  const CURRENT_PAGE_URL_STEM = "/instructors/edit/track";
  const EDIT_COURSE_URL_STEM= "/instructors/edit/course";
  const courseData = [
    {
      id: "kjavian65874194ajhvba",
      learningTrackId: "kjanvkjaeeqwqw12345678",
      title: "Course Title 1", 
      learningTrackTitle: "Learning Track Title", 
      longDescription: "Course Long Description. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",  // 367 characters
      shortDescription: "Course Short Description. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. \nLorem ipsum dolor sit amet.",
      nHours: 4, 
      nXP: 2700, 
      nLessons: 7, 
      nQuestions: 7, 
      userIsEnrolled: false
    },
    {
      id: "3847829840jkvfbnafjkanavf",
      learningTrackId: "kjanvkjaeeqwqw12345678",
      title: "Course Title 2", 
      learningTrackTitle: "Learning Track Title", 
      longDescription: "Course Long Description. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",  // 367 characters
      shortDescription: "Course Short Description. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. \nLorem ipsum dolor sit amet.",
      nHours: 4, 
      nXP: 2700, 
      nLessons: 7, 
      nQuestions: 7, 
      userIsEnrolled: false
    }
  ];

  const EMPTY_STRING = "";
  const relevantFields = {
    id: true,
    learningTrackId: false, 
    courseId: false,
    title: true, 
    shortDescription: true, 
    longDescription: true, 
    seqNumber: false, 
    description: false
  };
  const fieldValuesFactory = (trackId, title, shortDescription, longDescription) => {
    // NOTE: trackDetails/learningTrackEntity only has 'trackId' field 
    // but GenericEditEntityView needs a field named 'id'
    return {
      id: trackId,
      trackId,
      learningTrackId: "", 
      courseId: "",
      title, 
      shortDescription, 
      longDescription, 
      seqNumber: "", 
      description: ""
    };
  }

  const { trackId } = useParams();
  const navigate = useNavigate();

  const { trackDetails, courseSummaries, getTrackDetailsData, getCourseSummariesData } = LearningTrackScreenViewModel();
  const { createLearningTrack } = EditLearningTrackScreenViewModel();

  const [learningTrackEntityState, setLearningTrackEntityState] = React.useState(fieldValuesFactory(EMPTY_STRING, EMPTY_STRING, EMPTY_STRING, EMPTY_STRING));
  const [courseSummariesState, setCourseSummariesState] = React.useState([]);

  React.useEffect(() => {
    if (trackId != 0) {
      getTrackDetailsData(trackId);
      getCourseSummariesData(trackId);
    }
  }, []);
  
  React.useEffect(() => {
    if (trackId != 0) {
      trackDetails 
        ? setLearningTrackEntityState(fieldValuesFactory(trackDetails.trackId, trackDetails.title, trackDetails.shortDescription, trackDetails.longDescription)) 
        : setLearningTrackEntityState(fieldValuesFactory(EMPTY_STRING, EMPTY_STRING, EMPTY_STRING, EMPTY_STRING));
      courseSummaries ? setCourseSummariesState(courseSummaries) : setCourseSummariesState([]);
    }
  }, [trackDetails, courseSummaries]);

  function handleFormSubmission(event, data) {
    event.preventDefault();
    console.log('form data: ', data);

    // TODO: check valid id, not just non-empty id
    if (learningTrackEntityState.id.length != 0) {  // entity already exists
      console.log('entity already exists');

    }
    else {
      console.log('creating a new entity');
      createLearningTrack(data.title, data.shortDescription, data.longDescription)
        .then((value) => {
          console.log('success: value: ', value);
          navigate(`${CURRENT_PAGE_URL_STEM}/${value.id}`);
        })
        .catch((err) => {
          console.log('error: ', err);
        });
    }
  }

  // 63e6d109c5eb3b350790a1dd

  return (
    <>
      <BackButtonNavbar title={NAVBAR_TEXT} to={PREVIOUS_PAGE_URL} />
      
      <button>
        <Link to={EDIT_COURSE_URL_STEM}>To Edit Course</Link>
      </button>

      <button onClick={() => { 
        createTrack('title', 'short description', 'short description');
      }}>
          Click me
      </button>

      <GenericEditEntityView 
        relevantFields={relevantFields}
        fieldValues={learningTrackEntityState}
        handleSubmit={handleFormSubmission}  />
      {/* component re-renders every time key prop changes */}
        
      <AddInstructorsCard />

      <CourseListCard 
        courses={courseSummariesState}
        editMode={true}/>

      <AddRewardsCard />
      <button>Publish Changes</button>
      <hr />
      <button>Delete Learning Track</button>
    </>
  );
}