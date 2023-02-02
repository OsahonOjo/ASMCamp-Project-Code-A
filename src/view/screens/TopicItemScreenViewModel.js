import React from 'react';
import { getTopicItem } from '../../model/EduDataModel';

export default function TopicItemScreenViewModel() {

  const [topicItem, setTopicItem] = React.useState({});

  // rename _id field to id
  function topicItemFactory(topicItem) {
    let formattedTopicItem = Object.assign({}, topicItem);
    formattedTopicItem.id = topicItem._id;
    delete formattedTopicItem._id;
    return formattedTopicItem;
  }
  
  async function getTopicItemData(topicId, seqNumber) {
      const { response, error } = await getTopicItem(topicId, seqNumber);
      if (error) {
        console.log(error.message);
        return;
      }
      // NOTE: ['learningTrackId'], ['courseId'], ['trackId']      
      setTopicItem(topicItemFactory(response.response[0]));
  }

  function handleLessonSubmit(topicItemId) {
    console.log('lesson completed; id: ', topicItemId);
    return true;
  }

  function handleMCQSubmit(topicItemId, optionIndex) {
    let isCorrect = (optionIndex == topicItem.mcqAnswerIndex);
    isCorrect
      ? console.log('correct MCQ answer; id: ', topicItemId)
      : console.log('incorrect MCQ answer; id: ', topicItemId);
    return isCorrect;
  }

  function handleTFQSubmit(topicItemId, answer) {
    let isCorrect = (answer == topicItem.tfqAnswer);
    isCorrect
      ? console.log('correct TFQ answer; id: ', topicItemId)
      : console.log('incorrect TFQ answer; id: ', topicItemId);
    return isCorrect;
  }

  function handleSAQSubmit(topicItemId, answer) {
    let isCorrect = (topicItem.saqAnswer.find(element => element == answer));
    isCorrect
      ? console.log('correct SAQ answer; [answer, id]: ', answer, topicItemId)
      : console.log('incorrect SAQ answer; [answer, id]: ', answer, topicItemId);
    return isCorrect;
  }

  function handleCQSubmit(topicItemId, code) {
    console.log('CQ TODO; id: ', topicItemId);
  }

  return {
    topicItem, 
    getTopicItemData,
    handleLessonSubmit,
    handleMCQSubmit,
    handleTFQSubmit,
    handleSAQSubmit,
    handleCQSubmit
  };
}