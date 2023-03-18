import React from "react";
import { getTopicItemById, createTopicItemEntity, updateTopicItemEntity } from "../../modelsAndData/EduDataModel";

export default function EditTopicItemScreenViewModel() {

    const [topicItem, setTopicItem] = React.useState({});

    async function getTopicItemData(topicItemId) {
        const { response, error } = await getTopicItemById(topicItemId);
        if (error) {
            console.log(error.message);
            return;
        }
        let topicItemEntity = response.response;
        topicItemEntity.id = topicItemEntity._id;
        delete topicItemEntity.__v;
        delete topicItemEntity._id;
        setTopicItem(topicItemEntity);
    }

    async function createTopicItem(topicItemData) {
        console.log('inside viewmodel: create topic item');
        const { response, error } = await createTopicItemEntity(topicItemData);
        if (error) {
            console.log(error.message);
            return;
        }
        let topicItemEntity = response.response;
        topicItemEntity.id = topicItemEntity._id;
        delete topicItemEntity.__v;
        delete topicItemEntity._id;
        console.log('topic item created and formatted successfully: ', topicItemEntity);
        return topicItemEntity;
    }

    async function updateTopicItem(topicItemData) {
        console.log('inside viewmodel: update topic item');
        const { response, error } = await updateTopicItemEntity(topicItemData);
        if (error) {
            console.log(error.message);
            return;
        }
        let topicItemEntity = response.response;
        topicItemEntity.id = topicItemEntity._id;
        delete topicItemEntity.__v;
        delete topicItemEntity._id;
        console.log('topic item updated and formatted successfully: ', topicItemEntity);
        return topicItemEntity;
    }

    async function deleteTopicItem() {
        console.log('TODO: inside viewmodel: delete topic item');
    }

    return {
        topicItem, getTopicItemData, createTopicItem, updateTopicItem
    };
}