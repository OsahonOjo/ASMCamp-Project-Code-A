import React from 'react';
import { getTopicItem } from '../../modelsAndData/EduDataModel';
import { userIsEnrolledInTrack, enrollUser, updateProgress, getTrackProgressInfo } from "../../modelsAndData/UserDataModel";

export default function TopicItemScreenViewModel() {

  const [topicItem, setTopicItem] = React.useState({});
  const [progress, setProgress] = React.useState(0);

  // rename '_id' field to 'id'
  function topicItemBuilder(topicItem) {
    let formattedTopicItem = Object.assign({}, topicItem);
    formattedTopicItem.id = topicItem._id;
    delete formattedTopicItem._id;
    
    let learningTrackProgressInfo = getTrackProgressInfo(topicItem.learningTrackId);  // { percentage, nCourses }
    formattedTopicItem.learningTrackProgress = learningTrackProgressInfo ? learningTrackProgressInfo.percentage : 0;
    
    return formattedTopicItem;
  }
  
  async function getTopicItemData(topicId, seqNumber) {
      const { response, error } = await getTopicItem(topicId, seqNumber);
      if (error) {
        console.log(error.message);
        return;
      }     
      setTopicItem(topicItemBuilder(response.response[0]));
  }

  async function handleProgressUpdate(trackId, courseId, topicId, topicItemId) {
    if (!userIsEnrolledInTrack(trackId))
      await enrollUser(trackId);
    updateProgress(trackId, courseId, topicId, topicItemId);
    // reflect updated progress on progress bar
    const nextTopicItem = Object.assign({}, topicItem);
    let learningTrackProgressInfo = getTrackProgressInfo(topicItem.learningTrackId);  // { percentage, nCourses }
    nextTopicItem.learningTrackProgress = learningTrackProgressInfo.percentage;
    setTopicItem(nextTopicItem);
  }

  // + validateMCQAnswer(answer, submittedAnswer): boolean
  // + validateTFQAnswer(answer, submittedAnswer): boolean
  // + validateSAQAnswer(answer, submittedAnswer): boolean
  // + validateCQAnswer(answer, submittedAnswer): boolean

  async function handleLessonSubmit(trackId, courseId, topicId, topicItemId) {
    console.log('lesson completed; id: ', topicItemId);
    await handleProgressUpdate(trackId, courseId, topicId, topicItemId)
    return true;
  }

  async function handleMCQSubmit(trackId, courseId, topicId, topicItemId, optionIndex) {
    let isCorrect = (optionIndex == topicItem.mcqAnswerIndex);

    if (isCorrect) {
      console.log('correct MCQ answer; id: ', topicItemId);
      await handleProgressUpdate(trackId, courseId, topicId, topicItemId);
    }
    else
      console.log('incorrect MCQ answer; id: ', topicItemId);
    
    return isCorrect;
  }

  async function handleTFQSubmit(trackId, courseId, topicId, topicItemId, answer) {
    let isCorrect = (answer == topicItem.tfqAnswer);

    if (isCorrect) {
      console.log('correct TFQ answer; id: ', topicItemId);
      await handleProgressUpdate(trackId, courseId, topicId, topicItemId);
    }
    else
      console.log('incorrect TFQ answer; id: ', topicItemId);

    return isCorrect;
  }

  async function handleSAQSubmit(trackId, courseId, topicId, topicItemId, answer) {
    let isCorrect = (topicItem.saqAnswer.find(element => element == answer));

    if (isCorrect) {
      console.log('correct SAQ answer; [id, answer]: ', topicItemId, answer);
      await handleProgressUpdate(trackId, courseId, topicId, topicItemId);
    }
    else
      console.log('incorrect SAQ answer; [id, answer]: ', topicItemId, answer);
    
    return isCorrect;
  }

  function handleCQSubmit(topicItemId, code) {
    console.log('CQ TODO; id: ', topicItemId);
  }

  return {
    topicItem, 
    progress,
    getTopicItemData,
    handleLessonSubmit,
    handleMCQSubmit,
    handleTFQSubmit,
    handleSAQSubmit,
    handleCQSubmit
  };
}