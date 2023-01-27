import React from 'react';
import { getTopicItem } from '../../model/EduDataModel';

export default function TopicItemScreenViewModel() {

  // TODO: replace this with useRef()
  const [topicItemData, setStateTopicItemData] = React.useState({});
  
  const topicId = "63c985e730e8bf226256a771";
  const seqNumber = 2;
  async function getTopicItemData(topicId, seqNumber) {
      const { response, error } = await getTopicItem(topicId, seqNumber);
      setStateTopicItemData(response.response);
  }

  function handleTopicItemSubmit(type, payload) {
    switch(type) {
      case "LSN":
        // earnXP();
        break;
      case "MCQ":
        (payload.optionIndex && payload.optionIndex == topicItemData.mcqAnswerIndex)
          ? console.log('correct answer')
          : console.log('incorrect answer');
        break;
      default:
        console.log('Error.');
        break;
    }
  }

  function handleMCQSubmit(optionIndex) {
    return (optionIndex && optionIndex == topicItemData.mcqAnswerIndex)
      ? console.log('correct answer')
      : console.log('incorrect answer');
  }

  return {
    topicItemData, 
    getTopicItemData,
    handleMCQSubmit
  };
}

/*
    const [learningTrackSummaries, setState] = React.useState([]);

    function summaryFactory(id, title, shortDescription) {
        return { id, title, shortDescription };
    }

    function summarizeLearningTrackEntities(entities) {
        const summaries = [];
        entities.forEach(entity => 
            summaries.push(summaryFactory(entity._id, entity.title, entity.shortDescription)));
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
*/