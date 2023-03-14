import React from 'react';
import { getAllTracks } from '../../model/EduDataModel';
import { getTrackProgressInfo } from '../../model/UserDataModel';

export default function AllLearningTracksScreenViewModel() {

    const [learningTrackSummaries, setState] = React.useState([]);

    // function summaryBuilder(id, title, shortDescription, longDescription, nCourses) {
    //     return { id, title, shortDescription, longDescription, nCourses };
    // }

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

    async function getLearningTrackSummaries() {
        const { response, error } = await getAllTracks();
        if (error) {
            console.log(error.message);
            return;
        }
        setState(summarizeLearningTrackEntities(response.response));
    }

    return {
        learningTrackSummaries,
        getLearningTrackSummaries
    };
}