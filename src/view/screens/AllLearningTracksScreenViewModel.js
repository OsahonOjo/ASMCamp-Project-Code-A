import React from 'react';
import { getAllTracks } from '../../model/EduDataModel';
import { getTrackProgress } from '../../model/UserDataModel';

export default function AllLearningTracksScreenViewModel() {

    const [learningTrackSummaries, setState] = React.useState([]);

    // function summaryBuilder(id, title, shortDescription, longDescription, nCourses) {
    //     return { id, title, shortDescription, longDescription, nCourses };
    // }

    function summaryBuilder(learningTrackEntity) {
        return { 
            id: learningTrackEntity._id, 
            title: learningTrackEntity.title, 
            shortDescription: learningTrackEntity.shortDescription, 
            longDescription: learningTrackEntity.longDescription, 
            nCourses: learningTrackEntity.courseIds.length,
            progress: getTrackProgress(learningTrackEntity._id)
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