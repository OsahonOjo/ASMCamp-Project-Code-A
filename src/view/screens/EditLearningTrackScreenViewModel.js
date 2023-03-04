import React from "react";
import { createTrack, updateTrack, getAllTopicsInTrack, getAllTopicItemsInTrack, getAllBadgesInTrack, createBadgeEntity } from "../../model/EduDataModel";

export default function EditLearningTrackScreenViewModel() {

    const [ allTopicsInTrack, setAllTopicsInTrack ] = React.useState([]);
    const [ allTopicItemsInTrack, setAllTopicItemsInTrack ] = React.useState([]);
    const [ badges, setBadges ] = React.useState([]);

    // badgeData: learningTrackId, title, type, contentId, contentTitle
    async function createBadge(badgeData) {
        const { response, error } = await createBadgeEntity(badgeData);
        if (error) {
            console.log(error.message);
            return;
        }
        let newBadgeEntity = response.response;
        newBadgeEntity.id = newBadgeEntity._id;
        delete newBadgeEntity._id;
        // console.log('badge created successfully: ', newBadgeEntity);
        getAllBadgesInLearningTrack(newBadgeEntity.learningTrackId);  // Not good practice but easy solution to reload list of badges
        return true;
    }

    async function getAllBadgesInLearningTrack(trackId) {
        const { response, error } = await getAllBadgesInTrack(trackId);
        if (error) {
            console.log(error.message);
            return;
        }
        let allBadgesData = response.response;
        // console.log('allBadgesData: ', allBadgesData);
        allBadgesData = renameUnderscoreId(allBadgesData);
        // console.log('allBadgesData: ', allBadgesData);
        setBadges(allBadgesData);
    }

    function renameUnderscoreId(arrayOfEntities) {
        arrayOfEntities.forEach(element => {
            element.id = element._id;
            delete element._id;
        });
        return arrayOfEntities;
    }

    async function getAllTopicsInTrackData(trackId) {
        const { response, error } = await getAllTopicsInTrack(trackId);
        if (error) {
            console.log(error.message);
            return;
        }
        let allTopicsData = response.response;
        // console.log('allTopicsData: ', allTopicsData);
        allTopicsData = renameUnderscoreId(allTopicsData);
        // console.log('allTopicsData: ', allTopicsData);
        setAllTopicsInTrack(allTopicsData);
    }

    async function getAllTopicItemsInTrackData(trackId) {
        const { response, error } = await getAllTopicItemsInTrack(trackId);
        if (error) {
            console.log(error.message);
            return;
        }
        let allTopicItemsData = response.response;
        // console.log('allTopicItemsData: ', allTopicItemsData);
        allTopicItemsData = renameUnderscoreId(allTopicItemsData);
        // console.log('allTopicItemsData: ', allTopicItemsData);
        setAllTopicItemsInTrack(allTopicItemsData);
    }

    function formattedLearningTrackBuilder(learningTrack) {
        return {
            id: learningTrack._id,
            title: learningTrack.title,
            shortDescription: learningTrack.shortDescription,
            longDescription: learningTrack.longDescription
        };
    }

    async function createLearningTrack(title, shortDescription, longDescription) {
        const { response, error } = await createTrack(title, shortDescription, longDescription);
        if (error) {
            console.log(error.message);
            return;
        }
        let newLearningTrackEntity = response.response;
        let formattedLearningTrackEntity = formattedLearningTrackBuilder(newLearningTrackEntity);
        console.log('track created successfully: ', formattedLearningTrackEntity);
        return formattedLearningTrackEntity;
    }

    async function updateLearningTrack(trackId, title, shortDescription, longDescription) {
        const { response, error } = await updateTrack(trackId, title, shortDescription, longDescription);
        if (error) {
            console.log(error.message);
            return;
        }
        let learningTrackEntity = response.response;
        let formattedLearningTrackEntity = formattedLearningTrackBuilder(learningTrackEntity);
        console.log('track updated and formatted successfully: ', formattedLearningTrackEntity);
        return formattedLearningTrackEntity;
    }

    return {
        createLearningTrack,
        updateLearningTrack,
        allTopicsInTrack,
        allTopicItemsInTrack, 
        getAllTopicsInTrackData,
        getAllTopicItemsInTrackData,
        badges,
        createBadge,
        getAllBadgesInLearningTrack
    }

};