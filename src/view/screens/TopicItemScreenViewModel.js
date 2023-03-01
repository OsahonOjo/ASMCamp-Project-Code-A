import React from 'react';
import { getTopicItem } from '../../model/EduDataModel';
import { userIsEnrolledInTrack, enrollUser, updateProgress, getTrackProgressInfo } from "../../model/UserDataModel";

export default function TopicItemScreenViewModel() {

  const [topicItem, setTopicItem] = React.useState({});

  // rename _id field to id
  function topicItemBuilder(topicItem) {
    let trackProgressInfo = getTrackProgressInfo(topicItem.learningTrackId);  // { percentage, nCourses }
    if(trackProgressInfo)
      console.log('trackProgressInfo.percentage: ', trackProgressInfo.percentage);
      
    let formattedTopicItem = Object.assign({}, topicItem);

    formattedTopicItem.id = topicItem._id;
    delete formattedTopicItem._id;
    
    formattedTopicItem.learningTrackProgressPercent = trackProgressInfo ? trackProgressInfo.percentage : 0;
    
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
  }

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
    getTopicItemData,
    handleLessonSubmit,
    handleMCQSubmit,
    handleTFQSubmit,
    handleSAQSubmit,
    handleCQSubmit
  };
}