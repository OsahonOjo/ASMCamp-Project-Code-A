import React from "react";
import { getTrack, getAllCoursesInTrack } from '../../model/EduDataModel';

export default function LearningTrackScreenViewModel() {

  const HOURS_PER_COURSE = 4;
  const [trackDetails, setTrackDetails] = React.useState({});
  const [courseSummaries, setCourseSummaries] = React.useState([]);

  function trackDetailsFactory(trackId, title, shortDescription, longDescription, nCourses, nHours) {
    return { trackId, // NB: _id in a Learning Track entity
      title, longDescription, shortDescription, nCourses, nHours };
  }

  async function getTrackDetailsData(trackId) {
    const { response, error } = await getTrack(trackId);
    if (error) {
        console.log(error.message);
        return;
    }
    let trackEntity = response.response;
    let details = trackDetailsFactory(trackEntity._id, trackEntity.title, trackEntity.shortDescription, trackEntity.longDescription, trackEntity.courseIds.length, trackEntity.courseIds.length * HOURS_PER_COURSE);
    setTrackDetails(details);
  }

  function courseSummaryFactory(id, learningTrackId, title, shortDescription) {
    return { id, learningTrackId, title, shortDescription, nHours: HOURS_PER_COURSE };
  }

  function summarizeCourseEntities(entities) {
    const summaries = [];
    entities.forEach(entity => {
      summaries.push(courseSummaryFactory(entity._id, entity.learningTrackId, entity.title, entity.shortDescription));
    });
    return summaries;
  }

  async function getCourseSummariesData(trackId) {
    const { response, error } = await getAllCoursesInTrack(trackId);
    if (error) {
        console.log(error.message);
        return;
    }
    // NOTE: here, learningTrackId is ['learningTrackId'] for some reason
    let summaries = summarizeCourseEntities(response.response);
    setCourseSummaries(summaries);
  }

  return {
    trackDetails, 
    courseSummaries, 
    getTrackDetailsData,
    getCourseSummariesData
  };
}


  /* type MyType = {
        id: number;
        name: string;
    }

    type MyGroupType = {
        [key:string]: MyType;
    }

    var obj: MyGroupType = {
        "0": { "id": 0, "name": "Available" },
        "1": { "id": 1, "name": "Ready" },
        "2": { "id": 2, "name": "Started" }
    };
    // or if you make it an array
    var arr: MyType[] = [
        { "id": 0, "name": "Available" },
        { "id": 1, "name": "Ready" },
        { "id": 2, "name": "Started" }
    ];
  */