import React from 'react';
import { getAllTracks } from '../../model/EduDataModel';

export default function AllLearningTracksScreenViewModel() {

    const [learningTrackSummaries, setState] = React.useState([]);

    function summaryFactory(id, title, shortDescription, longDescription, nCourses) {
        return { id, title, shortDescription, longDescription, nCourses };
    }

    function summarizeLearningTrackEntities(entities) {
        const summaries = [];
        entities.forEach(entity => 
            summaries.push(summaryFactory(entity._id, entity.title, entity.shortDescription, entity.longDescription, entity.courseIds.length)));
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