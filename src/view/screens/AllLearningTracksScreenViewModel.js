import React from 'react';
import { getAllTracks } from '../../model/EduDataModel';

function AllLearningTracksScreenViewModel() {

    const [learningTrackSummaries, setState] = React.useState({});

    React.useEffect(() => {
        async function getLearningSummariesData() {
            let { response, error } = await getAllTracks();
            setState(response);
        }
        getLearningSummariesData();
    }, []);

    return {
        learningTrackSummaries
    };
}

export default AllLearningTracksScreenViewModel;