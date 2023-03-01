import React from "react"
import { getCourse, getAllTopicsInCourse, getAllTopicItemsInCourse } from '../../model/EduDataModel';
import { getCourseProgressInfo } from '../../model/UserDataModel';

export default function CourseScreenViewModel() {

    const HOURS_PER_COURSE = 4;
    const [courseDetails, setCourseDetails] = React.useState({});
    const [topicsAndTopicItems, setTopicsAndTopicItems] = React.useState([]);

    function courseDetailsFactory(courseEntity) {
        let courseProgressInfo = getCourseProgressInfo(courseEntity._id);  // { percentage, nTopics }
        return { 
            courseId: courseEntity._id, // NB: _id in a Course entity
            learningTrackId: courseEntity.learningTrackId,
            title: courseEntity.title,
            seqNumber: courseEntity.seqNumber,
            shortDescription: courseEntity.shortDescription,
            longDescription: courseEntity.longDescription,
            nHours: HOURS_PER_COURSE, 
            nLessons: courseEntity.nLessons, 
            nQuestions: courseEntity.nQuestions, 
            nXP: courseEntity.xp,
            progressInfo: courseProgressInfo ? courseProgressInfo : null
        };
      }

    async function getCourseDetailsData(courseId) {
        const { response, error } = await getCourse(courseId);
        if (error) {
            console.log(error.message);
            return;
        }
        let details = courseDetailsFactory(response.response);  
        setCourseDetails(details); 
    }

    function combinedTopicAndTopicItemsFactory(topicEntities, topicItemEntities) {
        let combined = [];
        let topicIdToCombinedIndexDict = {};

        // filter for the topic entity fields you want
        topicEntities.forEach((topicEntity, index) => {
            let topic = {
                id: topicEntity._id,
                learningTrackId: topicEntity.learningTrackId,
                courseId: topicEntity.courseId,
                title: topicEntity.title,
                description: topicEntity.description,
                topicItems: []
            };
            combined.push(topic);
        });

        // get desired topic item entity fields, append to parent topic
        topicItemEntities.forEach((topicItemEntity, index) => {
            // NOTE: topicItemEntity.courseId: ['courseId'], topicItemEntity.topicId: ['topicId']
            let topicItem = {
                id: topicItemEntity._id,
                type: topicItemEntity.type,
                title: topicItemEntity.title,
                xp: topicItemEntity.xp,
                topicId: topicItemEntity.topicId,
                courseId: topicItemEntity.courseId
            };
            let parentTopic = combined.find(topic => topic.id == topicItem.topicId);
            parentTopic.topicItems.push(topicItem);
        });

        return combined;
    }

    async function getTopicsAndTopicItemsData(courseId) {
        const topicEntities = await getAllTopicsInCourse(courseId);
        if (topicEntities.error) {
            console.log(topicEntities.error.message);
            return;
        }
        const topicItemEntities = await getAllTopicItemsInCourse(courseId);  // { response, error }
        if (topicItemEntities.error) {
            console.log(topicItemEntities.error.message);
            return;
        }
        let combinedEntities = combinedTopicAndTopicItemsFactory(topicEntities.response.response, topicItemEntities.response.response);
        setTopicsAndTopicItems(combinedEntities);
    }

    return {
        courseDetails,
        topicsAndTopicItems,
        getCourseDetailsData,
        getTopicsAndTopicItemsData
    };
}