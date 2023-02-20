import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import LearningTrackScreenViewModel from "./LearningTrackScreenViewModel";
import EditLearningTrackScreenViewModel from "./EditLearningTrackScreenViewModel";

import AddInstructorsCard from "../components/AddInstructorsCard";
import AddRewardsCard from "../components/AddRewardsCard";
import BackButtonNavbar from "../components/BackButtonNavbar";
import GenericEntityForm from "../components/GenericEntityForm";
import CourseListCard from "../components/CourseListCard";

import '../components/styles/card.css';

export default function EditLearningTrackScreen() {

  const NAVBAR_TEXT = "Edit Learning Track";
  const PREVIOUS_PAGE_URL = "/instructors/tracks";
  const CURRENT_PAGE_URL_STEM = "/instructors/edit/track";
  const EMPTY_STRING = "";

  /** for GenericEntityForm */
  const ENTITY_TYPES = {
    TRACK: "TRACK",
    COURSE: "COURSE",
    TOPIC: "TOPIC"
  };
  const relevantFieldsFactory = (entityType) => {
    return {
      id: true,
      learningTrackId: (entityType == ENTITY_TYPES.COURSE || entityType == ENTITY_TYPES.TOPIC) ? true : false, 
      courseId: entityType == ENTITY_TYPES.TOPIC ? true : false,
      title: true, 
      shortDescription: (entityType == ENTITY_TYPES.TRACK || entityType == ENTITY_TYPES.COURSE) ? true : false, 
      longDescription: (entityType == ENTITY_TYPES.TRACK || entityType == ENTITY_TYPES.COURSE) ? true : false, 
      seqNumber: entityType != ENTITY_TYPES.TRACK ? true : false,
      description: entityType == ENTITY_TYPES.TOPIC ? true : false
    };
  };
  const trackEntityValuesFactory = (id, title, shortDescription, longDescription) => {
    return {
      id,
      learningTrackId: "", 
      courseId: "",
      title, 
      shortDescription, 
      longDescription, 
      seqNumber: "", 
      description: ""
    };
  }

  const navigate = useNavigate();

  const SCREEN_MODE = {
    CREATE_NEW_ENTITY: "CREATE_NEW_ENTITY",
    EDIT_EXISTING_ENTITY: "EDIT_EXISTING_ENTITY"
  };  
  const { trackId } = useParams();

  const [screenMode, setScreenMode] = React.useState(trackId != 0 ? SCREEN_MODE.EDIT_EXISTING_ENTITY : SCREEN_MODE.CREATE_NEW_ENTITY);
  const [learningTrackEntityState, setLearningTrackEntityState] = React.useState(trackEntityValuesFactory(EMPTY_STRING, EMPTY_STRING, EMPTY_STRING, EMPTY_STRING));
  const [courseSummariesState, setCourseSummariesState] = React.useState([]);

  const { trackDetails, courseSummaries, getTrackDetailsData, getCourseSummariesData } = LearningTrackScreenViewModel();
  const { createLearningTrack, updateLearningTrack } = EditLearningTrackScreenViewModel();

  React.useEffect(() => {
    setScreenMode(trackId != 0 ? SCREEN_MODE.EDIT_EXISTING_ENTITY : SCREEN_MODE.CREATE_NEW_ENTITY);
  }, [trackId]);

  React.useEffect(() => {
    if (screenMode == SCREEN_MODE.EDIT_EXISTING_ENTITY) {
      getTrackDetailsData(trackId);
      getCourseSummariesData(trackId);
    }
  }, []);
  
  React.useEffect(() => {
    if (screenMode == SCREEN_MODE.EDIT_EXISTING_ENTITY) {
      // account for when trackDetails and courseSummaries are {}
      trackDetails && Object.keys(trackDetails).length != 0
        ? setLearningTrackEntityState(trackEntityValuesFactory(trackDetails.trackId, trackDetails.title, trackDetails.shortDescription, trackDetails.longDescription)) 
        : setLearningTrackEntityState(trackEntityValuesFactory(EMPTY_STRING, EMPTY_STRING, EMPTY_STRING, EMPTY_STRING));
      courseSummaries && Object.keys(courseSummaries).length != 0
        ? setCourseSummariesState(courseSummaries) 
        : setCourseSummariesState([]);
    }
  }, [trackDetails, courseSummaries]);

  function handleFormSubmission(event, data) {
    event.preventDefault();
    console.log('form data: ', data);

    /**
     * NB: property names (data.x) below MUST match those returned by trackEntityValuesFactory()
     * Remember: updatedEntity, newEntity are returned from Promises in EditLearningTrackScreenViewModel
     *    and have already been formatted to rename '_id' field to 'id'
     */

    // TODO: check valid id, not just non-empty id
    if (screenMode == SCREEN_MODE.EDIT_EXISTING_ENTITY) {
      console.log('entity already exists');
      updateLearningTrack(data.id, data.title, data.shortDescription, data.longDescription)
        .then((updatedEntity) => {
          console.log('EDIT_EXISTING_ENTITY updatedEntity: ', updatedEntity);
          let newState = trackEntityValuesFactory(updatedEntity.id, updatedEntity.title, updatedEntity.shortDescription, updatedEntity.longDescription);
          console.log('new state: ', newState);
          setLearningTrackEntityState(newState);
          console.log('updated learningTrackEntityState: ', learningTrackEntityState);
        })
        .catch((error) => {
          console.log('error: ', error);
        });
    }
    else if (screenMode == SCREEN_MODE.CREATE_NEW_ENTITY) {
      console.log('creating a new entity');
      createLearningTrack(data.title, data.shortDescription, data.longDescription)
        .then((newEntity) => {
          console.log('success: newEntity: ', newEntity);
          navigate(`${CURRENT_PAGE_URL_STEM}/${newEntity.id}`);  // track's id becomes URL param
        })
        .catch((error) => {
          console.log('error: ', error);
        });
    }
  }

  return (
    <>
      <BackButtonNavbar title={NAVBAR_TEXT} to={PREVIOUS_PAGE_URL} />
      
      <GenericEntityForm 
        relevantFields={relevantFieldsFactory(ENTITY_TYPES.TRACK)}
        fieldValues={learningTrackEntityState}
        handleSubmit={handleFormSubmission} />
        
      {screenMode == SCREEN_MODE.CREATE_NEW_ENTITY
        ? null
        : <>
            <AddInstructorsCard />
            
            <CourseListCard 
              courses={courseSummariesState}
              editMode={true}
              editModeNextPageUrlStem={"/instructors/edit/course"}
              learningTrackId={trackId} />

            <AddRewardsCard />

            <button>Publish Changes</button>
            <hr />
            <button>Delete Learning Track</button>
          </>}
    </>
  );
}

/*
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


  <button>
        <Link to={EDIT_COURSE_URL_STEM}>To Edit Course</Link>
      </button>

      <button onClick={() => { 
        updateTrack('63c999a6816a63733f9e5020', 'new title', 'new short description', 'new long description');
      }}>
          Click me to update Track
      </button>

      <button type="button" onClick={() => { console.log('screenMode: ', screenMode) }}>Click for Screen Mode</button>

*/