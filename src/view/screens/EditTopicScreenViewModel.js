import React from "react";
import { getTopic, getAllTopicItemsInTopic, createTopicEntity, updateTopicEntity } from "../../model/EduDataModel";

export default function EditTopicScreenViewModel() {

    const [topicData, setTopicData] = React.useState({});
    const [topicItemsData, setTopicItemsData] = React.useState([]);

    function formattedTopicItemsFactory(topicItems) {
        topicItems.forEach(topicItem => {
            topicItem.id = topicItem._id;
        }); 
        return topicItems;
    }

    async function getTopicData(topicId) {
        const { response, error } = await getTopic(topicId);
        if (error) {
            console.log(error.message);
            return;
        }
        let topicEntity = response.response;
        topicEntity.id = topicEntity._id;
        setTopicData(topicEntity); 
    }

    async function getTopicItemsData(topicId) {
        const { response, error } = await getAllTopicItemsInTopic(topicId);
        if (error) {
            console.log(error.message);
            return;
        }
        let topicItems = response.response;
        let formattedTopicItems = formattedTopicItemsFactory(topicItems);
        setTopicItemsData(formattedTopicItems);
    }

    async function createTopic(learningTrackId, courseId, title, seqNumber, description) {
        console.log('inside viewmodel: create topic');
        const { response, error } = await createTopicEntity(learningTrackId, courseId, title, seqNumber, description);
        if (error) {
            console.log(error.message);
            return;
        }
        let topicEntity = response.response;
        topicEntity.id = topicEntity._id;
        console.log('topic created and formatted successfully: ', topicEntity);
        return topicEntity;
    }

    async function updateTopic(id, learningTrackId, courseId, title, seqNumber, description) {
        console.log("inside viewmodel: update topic");
        const { response, error } = await updateTopicEntity(id, learningTrackId, courseId, title, seqNumber, description);
        if (error) {
            console.log(error.message);
            return;
        }
        let topicEntity = response.response;
        topicEntity.id = topicEntity._id;
        console.log('topic updated and formatted successfully: ', topicEntity);
        return topicEntity;
    }

    async function deleteTopic() {
        console.log("TODO: inside viewmodel: delete topic");
    }

    return {
        topicData, topicItemsData, getTopicData, getTopicItemsData, createTopic, updateTopic
    };
}

/*
    return {
        id: topicEntity._id,
        learningTrackId: topicEntity.learningTrackId,
        courseId: topicEntity.courseId,
        title: topicEntity.title,
        seqNumber: topicEntity.seqNumber,
        description: topicEntity.description
    };

    let item = {
        id: topicItem._id,
        learningTrackId: topicItem.learningTrackId,
        courseId: topicItem.courseId,
        topicId: topicItem.topicId,
        seqNumber: topicItem.seqNumber,
        type: topicItem.type,
        title: topicItem.title,
        xp: topicItem.xp
    };
    formattedTopicItems.push(item);
*/