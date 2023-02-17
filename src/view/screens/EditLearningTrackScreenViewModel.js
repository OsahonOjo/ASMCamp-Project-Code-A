import React from "react";
import { createTrack, updateTrack } from "../../model/EduDataModel";

export default function EditLearningTrackScreenViewModel() {

    function formattedLearningTrackFactory(learningTrack) {
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
        let formattedLearningTrackEntity = formattedLearningTrackFactory(newLearningTrackEntity);
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
        let formattedLearningTrackEntity = formattedLearningTrackFactory(learningTrackEntity);
        console.log('track updated and formatted successfully: ', formattedLearningTrackEntity);
        return formattedLearningTrackEntity;
    }

    return {
        createLearningTrack,
        updateLearningTrack
    }

};