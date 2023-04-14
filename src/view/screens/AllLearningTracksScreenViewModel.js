import React from 'react';
import { getAllTracks } from '../../modelsAndData/EduDataModel';
import { getTrackProgressInfo } from '../../modelsAndData/UserDataModel';

export default function AllLearningTracksScreenViewModel() {

    // const [learningTrackSummaries, setState] = React.useState([]);

    function summaryBuilder(learningTrackEntity) {
        let trackProgressInfo = getTrackProgressInfo(learningTrackEntity._id);  // returns { percentage, nCourses } or null
        // nCourses: learningTrackEntity.courseIds.length,
        return { 
            id: learningTrackEntity._id, 
            title: learningTrackEntity.title, 
            shortDescription: learningTrackEntity.shortDescription, 
            longDescription: learningTrackEntity.longDescription,
            progress: trackProgressInfo ? trackProgressInfo : null
        };
    }

    function summarizeLearningTrackEntities(entities) {
        const summaries = [];
        entities.forEach(entity => 
            summaries.push(summaryBuilder(entity)));
        return summaries;
    }

    // async function getLearningTrackSummaries() {
    //     const { response, error } = await getAllTracks();  //  "response": { "response": {} or [] }
    //     if (error) {
    //         console.log(error.message);
    //         return Promise.reject(error.message);
    //     }
    //     // setState(summarizeLearningTrackEntities(response.response));

    //     // TODO: maybe inline the two helper functions and put them
    //     // inside this function

    //     return Promise.resolve(summarizeLearningTrackEntities(response.response));
    // }

    return async function() {
        const { response, error } = await getAllTracks();  //  "response": { "response": {} or [] }
        if (error) {
            console.log(error.message);
            return Promise.reject(error.message);
        }
        // setState(summarizeLearningTrackEntities(response.response));

        // TODO: maybe inline the two helper functions and put them
        // inside this function

        return Promise.resolve(summarizeLearningTrackEntities(response.response));
    };

    // learningTrackSummaries,
        // getLearningTrackSummaries
}