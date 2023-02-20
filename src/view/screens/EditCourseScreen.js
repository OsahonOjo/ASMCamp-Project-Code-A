import React from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import CourseScreenViewModel from "./CourseScreenViewModel";
import EditCourseScreenViewModel from "./EditCourseScreenViewModel";

import BackButtonNavbar from "../components/BackButtonNavbar";
import GenericEntityForm from "../components/GenericEntityForm";
import TopicsListCardNoTopicItems from "../components/TopicsListCardNoTopicItems";

export default function EditCourseScreen() {

    const NAVBAR_TEXT = "Edit Course";
    const PREVIOUS_PAGE_URL = "/instructors/edit/track";
    const CURRENT_PAGE_URL_STEM = "/instructors/edit/course";
    const NEXT_PAGE_URL_STEM = "/instructors/edit/topic";
    const EMPTY_STRING = "";

    const topicsListMainIcon = {
        icon: <span className="material-symbols-outlined">topic</span>,
        style: {}
    };
    const topicListLinkIcon = {
        icon: <span className="material-symbols-outlined">edit</span>,
        style: {},
        to: NEXT_PAGE_URL_STEM
    };
    const newTopicLinkIcon = <span className="material-symbols-outlined">navigate_next</span>;

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
    const courseEntityValuesFactory = (id, learningTrackId, title, seqNumber, shortDescription, longDescription) => {
        return {
            id,
            learningTrackId, 
            courseId: "",
            title, 
            shortDescription, 
            longDescription, 
            seqNumber, 
            description: ""
        };
    };

    const topicSummariesFactory = (combinedTopicsAndTopicItems) => {
        let summaries = [];
        combinedTopicsAndTopicItems.forEach(combinedItem => {
            let topic = {
                id: combinedItem.id,
                learningTrackId: combinedItem.learningTrackId,
                courseId: combinedItem.courseId,
                title: combinedItem.title,
                description: combinedItem.description
            };
            summaries.push(topic);
        });
        return summaries;
    }

    const SCREEN_MODE = {
        CREATE_NEW_ENTITY: "CREATE_NEW_ENTITY",
        EDIT_EXISTING_ENTITY: "EDIT_EXISTING_ENTITY"
    };  
    
    const location = useLocation();
    const navigate = useNavigate();

    /**
     * courseId = 0: CREATE_NEW_ENTITY; only learningTrackId shown in GenericEntityForm; no topics created yet
     * courseId != 0: EDIT_EXISTING_ENTITY; leave GenericEntityForm empty, it'll be filled out later
     */

    const { courseId } = useParams();
    const [screenMode, setScreenMode] = React.useState(courseId != 0 ? SCREEN_MODE.EDIT_EXISTING_ENTITY : SCREEN_MODE.CREATE_NEW_ENTITY);
    const [courseEntityState, setCourseEntityState] = React.useState(courseEntityValuesFactory(EMPTY_STRING, courseId != 0 ? EMPTY_STRING : location.state.learningTrackId, EMPTY_STRING, EMPTY_STRING, EMPTY_STRING, EMPTY_STRING));
    const [topicSummariesState, setTopicSummariesState] = React.useState([]);
    
    // ViewModel interfaces
    const { courseDetails, topicsAndTopicItems, getCourseDetailsData, getTopicsAndTopicItemsData } = CourseScreenViewModel();
    const { createCourse, updateCourse } = EditCourseScreenViewModel();

    // change in courseId triggers change in screen mode
    React.useEffect(() => {
        setScreenMode(courseId != 0 ? SCREEN_MODE.EDIT_EXISTING_ENTITY : SCREEN_MODE.CREATE_NEW_ENTITY);
    }, [courseId]);

    // change in screen mode conditionally triggers fetching data for existing course entity
    React.useEffect(() => {
        if (screenMode == SCREEN_MODE.EDIT_EXISTING_ENTITY) {
            getCourseDetailsData(courseId);
            getTopicsAndTopicItemsData(courseId);
        }
    }, [screenMode]);
    
    // successful data fetching conditionally changes content displayed on screen for existing course entity
    React.useEffect(() => {
        if (screenMode == SCREEN_MODE.EDIT_EXISTING_ENTITY) {
            // account for when courseDetails and topicAndTopicItems are {}
            courseDetails && Object.keys(courseDetails).length != 0
                ? setCourseEntityState(courseEntityValuesFactory(courseDetails.courseId, courseDetails.learningTrackId, courseDetails.title, courseDetails.seqNumber, courseDetails.shortDescription, courseDetails.longDescription)) 
                : setCourseEntityState(courseEntityValuesFactory(EMPTY_STRING, 'location.state.learningTrackId', EMPTY_STRING, EMPTY_STRING, EMPTY_STRING, EMPTY_STRING));
            topicsAndTopicItems && Object.keys(topicsAndTopicItems).length != 0
                ? setTopicSummariesState(topicSummariesFactory(topicsAndTopicItems)) 
                : setTopicSummariesState([]);
        }
    }, [courseDetails, topicsAndTopicItems]);

    function handleFormSubmission(event, data) {
        event.preventDefault();
        console.log('form data: ', data);

        /**
         * NB: property names (data.x) below MUST match those returned by trackEntityValuesFactory()
         * Remember: updatedEntity, newEntity are returned from Promises in EditCourseScreenViewModel
         *    and have already been formatted to rename '_id' field to 'id'
         */

        // TODO: check valid id, not just non-empty id
        // id, learningTrackId, title, seqNumber, shortDescription, longDescription
        if (screenMode == SCREEN_MODE.EDIT_EXISTING_ENTITY) {
            console.log('course entity already exists');
            updateCourse(data.id, data.learningTrackId, data.title, data.seqNumber, data.shortDescription, data.longDescription)
                .then((updatedEntity) => {
                    console.log('EDIT_EXISTING_ENTITY updatedEntity: ', updatedEntity);
                    let newState = courseEntityValuesFactory(updatedEntity.id, updatedEntity.learningTrackId, updatedEntity.title, updatedEntity.seqNumber, updatedEntity.shortDescription, updatedEntity.longDescription);
                    console.log('new state: ', newState);
                    setCourseEntityState(newState);
                })
                .catch((error) => {
                    console.log('error: ', error);
                });
        }

        // in SCREEN_MODE.CREATE_NEW_ENTITY, you can't go beyond this screen so you can trust location.state
        else if (screenMode == SCREEN_MODE.CREATE_NEW_ENTITY) {
            console.log('creating a new course entity');
            createCourse(location.state.learningTrackId, data.title, data.seqNumber, data.shortDescription, data.longDescription)
                .then((newEntity) => {
                    console.log('success: course newEntity: ', newEntity);
                    navigate(`${CURRENT_PAGE_URL_STEM}/${newEntity.id}`, { state: { from: location.state.from } });  // course's id becomes URL param
                })
                .catch((error) => {
                    console.log('error: ', error);
                });
        }
    }

    return (
        <>
            {/* in SCREEN_MODE.CREATE_NEW_ENTITY, you can't go beyond this screen so you can trust the value of location.state.from */}
            <BackButtonNavbar 
                title={NAVBAR_TEXT}     
                to={ screenMode == SCREEN_MODE.CREATE_NEW_ENTITY 
                        ? location.state.from 
                        : (screenMode == SCREEN_MODE.EDIT_EXISTING_ENTITY ? `${PREVIOUS_PAGE_URL}/${courseDetails.learningTrackId}` : null) } />
            
            <button type="button" onClick={() => { console.log('screenMode: ', screenMode) }}>Click for Screen Mode</button>

            <button type="button" onClick={() => { 
                console.log('courseDetails: ', courseDetails);
                console.log('courseEntityState: ', courseEntityState); }}>
                    Click for States
            </button>

            <GenericEntityForm 
                relevantFields={relevantFieldsFactory(ENTITY_TYPES.COURSE)}
                fieldValues={courseEntityState}
                handleSubmit={handleFormSubmission} />

            {screenMode == SCREEN_MODE.CREATE_NEW_ENTITY
                ? null
                : <>
                    <TopicsListCardNoTopicItems 
                        topicData={topicSummariesState}
                        mainIcon={topicsListMainIcon}
                        linkIcon={topicListLinkIcon}
                        linkStem={NEXT_PAGE_URL_STEM}
                        learningTrackId={courseEntityState.learningTrackId} 
                        courseId={courseEntityState.id} /> {/* topic's courseId is course's id */}
                        
                    <hr />
                    <button>Delete Course</button>
                  </> }

        </>
    );
}

/*
    const topicsData = [
        {
            id: "kanfiuear647839",
            learningTrackId: "kanfiuear6478aabbafvara",
            courseId: "758493kavkrnfiuear647839",
            title: "Topic 1",
            description: "Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing."
        },
        {
            id: "ear647839kanfiu",
            learningTrackId: "r6478aabiuear6478bafvara",
            courseId: "758493kanfiueakavkrnfiuear647839",
            title: "Topic 2",
            description: "Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing."
        }
    ];
*/