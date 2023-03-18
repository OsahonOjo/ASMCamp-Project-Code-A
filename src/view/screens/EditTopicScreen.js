import React from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import EditTopicScreenViewModel from "./EditTopicScreenViewModel";

import BackButtonNavbar from "../components/BackButtonNavbar";
import GenericEntityForm from "../components/GenericEntityForm";
import TopicItemsListCard from "../components/TopicItemsListCard";

import { styles } from "../components/styles/commonDisplayStyles";

import { constants } from '../../modelsAndData/constants';

/**
 *  An EditXScreen gets the ID's it requires via one of two methods depending on the screen's mode.
 *  Both methods depend on the screen's xId URL paramter.
 * 
 *  Method One (CREATE_NEW_ENTITY mode): 
 *    The xId parameter has a value of 0.
 *    In this case, the previous screen must also pass along the other required ID's 
 *      via React Router's Link's state prop
 *  
 *  Method Two (EDIT_EXISTING_ENTITY mode):
 *    The xId parameter is the _id of an existing entity in the database.
 *    In this case, the screen uses xId to query the database for the entity/document 
 *    and gets the other required ID's from that
 */

export default function EditTopicScreen() {

    const NAVBAR_TEXT = "Edit Topic";
    const PREVIOUS_PAGE_URL_STEM = "/instructors/edit/course";
    const CURRENT_PAGE_URL_STEM = "/instructors/edit/topic";
    const NEXT_PAGE_URL_STEM = "/instructors/edit/item";
    const EMPTY_STRING = "";

    const { PRIMARY_TEXT_COLOR_DARK, SECONDARY_BACKGROUND_COLOR_DARK } = constants;
    const TEXT_COLOR = PRIMARY_TEXT_COLOR_DARK;
    const DEFAULT_MARGIN = '10px';
    
    const topicItemsListMainIcon = {
        icon: <span className="material-symbols-outlined" style={{ ...styles.mainIcon24pxFont, marginRight: DEFAULT_MARGIN, color: '#444' }}>category</span>,
        style: {}
    };
    const topicItemsListLinkIcon = {
        icon: <span className="material-symbols-outlined" style={{ ...styles.icon30px, marginRight: DEFAULT_MARGIN, color: TEXT_COLOR }}>edit</span>,
        style: {},
        to: NEXT_PAGE_URL_STEM
    };

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
    const topicEntityValuesFactory = (id, learningTrackId, courseId, title, seqNumber, description) => {
        return {
            id,
            learningTrackId, 
            courseId,
            title, 
            shortDescription: "", 
            longDescription: "", 
            seqNumber, 
            description
        };
    };

    const SCREEN_MODE = {
        CREATE_NEW_ENTITY: "CREATE_NEW_ENTITY",
        EDIT_EXISTING_ENTITY: "EDIT_EXISTING_ENTITY"
    };  

    const location = useLocation();
    const navigate = useNavigate();

    /**
     * courseId = 0: CREATE_NEW_ENTITY; only learningTrackId, courseId shown in GenericEntityForm; no item created yet
     * courseId != 0: EDIT_EXISTING_ENTITY; leave GenericEntityForm empty, it'll be filled out later
     */

    const { topicId } = useParams();
    const [screenMode, setScreenMode] = React.useState(topicId != 0 ? SCREEN_MODE.EDIT_EXISTING_ENTITY : SCREEN_MODE.CREATE_NEW_ENTITY);
    const [topicEntityState, setTopicEntityState] = React.useState(topicEntityValuesFactory(EMPTY_STRING, topicId != 0 ? EMPTY_STRING : location.state.learningTrackId, topicId != 0 ? EMPTY_STRING : location.state.courseId, EMPTY_STRING, EMPTY_STRING, EMPTY_STRING));
    const [topicItemsState, setTopicItemsState] = React.useState([]);

    // ViewModel interface
    const { topicData, topicItemsData, getTopicData, getTopicItemsData, createTopic, updateTopic } = EditTopicScreenViewModel();

    // change in topicId triggers change in screen mode
    React.useEffect(() => {
        setScreenMode(topicId != 0 ? SCREEN_MODE.EDIT_EXISTING_ENTITY : SCREEN_MODE.CREATE_NEW_ENTITY);
    }, [topicId]);

    // change in screen mode conditionally triggers fetching data for existing topic entity
    React.useEffect(() => {
        if (screenMode == SCREEN_MODE.EDIT_EXISTING_ENTITY) {
            getTopicData(topicId);
            getTopicItemsData(topicId);
        }
    }, [screenMode]);

    // successful data fetching conditionally changes content displayed on screen for existing topic entity
    React.useEffect(() => {
        if (screenMode == SCREEN_MODE.EDIT_EXISTING_ENTITY) {
            // account for when topicData and topicItemData are {}
            topicData && Object.keys(topicData).length != 0
                ? setTopicEntityState(topicEntityValuesFactory(topicData.id, topicData.learningTrackId, topicData.courseId, topicData.title, topicData.seqNumber, topicData.description)) 
                : setTopicEntityState(topicEntityValuesFactory(EMPTY_STRING, EMPTY_STRING, EMPTY_STRING, EMPTY_STRING, EMPTY_STRING, EMPTY_STRING));
            topicItemsData && Object.keys(topicItemsData).length != 0
                ? setTopicItemsState(topicItemsData) 
                : setTopicItemsState([]);
        }
    }, [topicData, topicItemsData]);

    function handleFormSubmission(event, data) {
        event.preventDefault();
        console.log('form data: ', data);

        /**
         * NB: property names (data.x) below MUST match those returned by trackEntityValuesFactory()
         * Remember: updatedEntity, newEntity are returned from Promises in EditCourseScreenViewModel
         *    and have already been formatted to rename '_id' field to 'id'
         */

        // TODO: check valid id, not just non-empty id
        if (screenMode == SCREEN_MODE.EDIT_EXISTING_ENTITY) {
            console.log('topic entity already exists');
            updateTopic(data.id, data.learningTrackId, data.courseId, data.title, data.seqNumber, data.description)
                .then(updatedEntity => {
                    console.log('EDIT_EXISTING_ENTITY updated Topic Entity: ', updatedEntity);
                    let newTopicEntityState = topicEntityValuesFactory(updatedEntity.id, updatedEntity.learningTrackId, updatedEntity.courseId, updatedEntity.title, updatedEntity.seqNumber, updatedEntity.description);
                    console.log('new state: ', newTopicEntityState);
                    setTopicEntityState(newTopicEntityState);
                })
                .catch(error => {
                    console.log('error: ', error);
                });
        }
        // in SCREEN_MODE.CREATE_NEW_ENTITY, you can't go beyond this screen so you can trust location.state
        else if (screenMode == SCREEN_MODE.CREATE_NEW_ENTITY) {
            console.log('creating a new topic entity');
            createTopic(location.state.learningTrackId, location.state.courseId, data.title, data.seqNumber, data.description)
                .then(newEntity => {
                    console.log('success: topic newEntity: ', newEntity);
                    navigate(`${CURRENT_PAGE_URL_STEM}/${newEntity.id}`, { state: { from: location.state.from } });  // course's id becomes URL param
                })
                .catch(err => {
                    console.log('error: ', err);
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
                        : (screenMode == SCREEN_MODE.EDIT_EXISTING_ENTITY ? `${PREVIOUS_PAGE_URL_STEM}/${topicEntityState.courseId}` : null) } />

            {/* <button>
                <Link to={NEXT_PAGE_URL_STEM}>To Edit Topic Item</Link>
            </button>

            <button type="button" onClick={() => { console.log('screenMode: ', screenMode) }}>Click for Screen Mode</button>

            <button type="button" onClick={() => { 
                console.log('topicData: ', topicData);
                console.log('topicEntityState: ', topicEntityState); }}>
                    Click for States
            </button> */}

            <GenericEntityForm 
                relevantFields={relevantFieldsFactory(ENTITY_TYPES.TOPIC)}
                fieldValues={topicEntityState}
                handleSubmit={handleFormSubmission} />

            {screenMode == SCREEN_MODE.CREATE_NEW_ENTITY
                ? null
                : <>
                    <TopicItemsListCard 
                        topicItemsData={topicItemsState}
                        mainIcon={topicItemsListMainIcon}
                        linkIcon={topicItemsListLinkIcon}
                        linkStem={NEXT_PAGE_URL_STEM}
                        learningTrackId={topicEntityState.learningTrackId} 
                        courseId={topicEntityState.courseId} 
                        topicId={topicEntityState.id} /> {/* topicItem's topicId is topic's id */}
                        
                    {/* <hr />
                    <button>Delete Topic</button> */}
                  </> }
        </>
    );
}

/*
    const topicitemsData = [
        {
            id: "kanfiuear647839",
            learningTrackId: "kanfiuear6478aabbafvara",
            courseId: "758493kavkrnfiuear647839",
            topicId: "758493kavkrnfiea",
            title: "Topic Item 1",
            description: "Lesson"
        },
        {
            id: "ear647839kanfiu",
            learningTrackId: "r6478aabiuear6478bafvara",
            courseId: "758493kanfiueakavkrnfiuear647839",
            topicId: "758493kavkrnfieakavkrnfiu",
            title: "Topic Item 2",
            description: "Multiple-Choice Question"
        },
        {
            id: "ear64783ear647839k9kanfiu",
            learningTrackId: "r6478aabiafvara",
            courseId: "r6478aabiuear6478b",
            topicId: "krnfi758493kavnfiu",
            title: "Topic Item 3",
            description: "Short Answer Question"
        }
    ];
*/