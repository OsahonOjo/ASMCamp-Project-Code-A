import React from 'react';
import { getAllTracks } from '../../model/EduDataModel';
import { getTrackProgressAll } from '../../model/UserDataModel';

export default function ProgressAndRewardsScreenViewModel() {

    const [allLearningTracksProgressData, setAllLearningTracksProgressData] = React.useState([]);

    function allLearningTracksProgressDataBuilder(learningTrackEntities, learningTrackProgressData) {
        // learningTrackEntities: [{}, {}, ...]
        // learningTrackProgressData: { id: LearningTrackProgress, ... }

        let combinedProgressData = [];
        console.log('initial combinedProgressData: ', combinedProgressData);

        learningTrackEntities.forEach(entity => {
            let combinedRecord = {
                id: entity._id,
                title: entity.title,
            };

            // check if entity id exists in progress data
            const entityProgressRecord = learningTrackProgressData[entity._id];

            // if so, combine. if not, insert 0 placeholder
            entityProgressRecord 
                ? combinedRecord.percentage = Math.round( ( entityProgressRecord.totalXPEarned / entityProgressRecord.totalTrackXP ) * 100 )
                : combinedRecord.percentage = 0;
            
            // add to combined array
            combinedProgressData.push(combinedRecord);
            console.log('combinedProgressData: ', combinedProgressData);
        });

        console.log('final combinedProgressData: ', combinedProgressData);
        return combinedProgressData;
    }
    
    async function getAllLearningTracksProgressData() {
        // get all track ids and titles
        const { response, error } = await getAllTracks();
        if (error) {
            console.log(error.message);
            return;
        }
        const allLearningTrackEntities = response.response;
        console.log('allLearningTrackEntities: ', allLearningTrackEntities);

        // get corresponding progress data
        let allLearningTrackProgress = await getTrackProgressAll(); // returns { id: LearningTrackProgress, ... } or null
        if (!allLearningTrackProgress)
            allLearningTrackProgress = {};
        console.log('allLearningTrackProgress: ', allLearningTrackProgress);

        // put them, combined, in an object
        const combinedProgressData = allLearningTracksProgressDataBuilder(allLearningTrackEntities, allLearningTrackProgress);
        console.log('combinedProgressData: ', combinedProgressData);

        setAllLearningTracksProgressData(combinedProgressData);
    }

    return {
        allLearningTracksProgressData,
        getAllLearningTracksProgressData
    };
}