import { BASE_API_URL, VIEW_PREFIX, POST_PREFIX, DELETE_PREFIX, ALL_TRACKS, TRACK } from './apiEndpoints';

const REQUEST_METHODS = { GET: "GET", POST: "POST" };

const GET_REQUEST_OPTIONS = {
    method: "GET",
    headers: { "Accept": "application/json" },
    mode: "cors"
};

const responseFactory = (response, error) => {
    return { response, error };
};

async function callFetchAPI(method, path, options) {
    let response = await fetch(path, options);
    let data = null, error = null;
    if (response.body)
        data = await response.json();
    else   
        error = {
            message: `${method} request failed at ${path} endpoint`,
            response
        };
    return responseFactory(data, error);
}

// BASE_API_URL: localhost:3001/api/v1
export async function enrollUser(trackId) {
    let path = `${BASE_API_URL}${VIEW_PREFIX}/template/progress/track/${trackId}`;
    const { response, error } = await callFetchAPI(REQUEST_METHODS.GET, path, GET_REQUEST_OPTIONS);  // { response, error }
    if (error) {
        console.log(error.message);
        return;
    }
    console.log('response: ', response);
    console.log('window.LearningTrackProgress: ', window.LearningTrackProgress);
    Object.assign(window.LearningTrackProgress, response.learningTrackProgress);
}

export function userIsEnrolled(trackId) {
    let record = window.LearningTrackProgress[trackId];
    return record ? true : false;
}

export function getTrackProgress(trackId) {
    if (!userIsEnrolled(trackId))
        return null;
    let record = window.LearningTrackProgress[trackId];
    return Math.round((record.totalXPEarned / record.totalTrackXP) * 100);
}

function learningTrackProgressRecordBuilder(id, courseIds, totalTrackXP) {
    return {
        id, 
        coursesCompletedIds: [], 
        coursesNotCompletedIds: courseIds.slice(),
        nCourses: courseIds.length,
        totalTrackXP,
        totalXPEarned: 0,
        rewardsEarned: []
    };
}

/** There is only one type of reward: badges. 
 *  A badge is given when the player completes a topic item, topic, course or learning track.
 *  @param type specifies the type ('TPITM', 'TOPIC', 'COURS', 'TRACK') that was completed. */

function rewardBuilder(rewardId, title, type, contentId) {
    const types = {
        TPITM: 'TPITM',
        TOPIC: 'TOPIC',
        COURS: 'COURS',
        TRACK: 'TRACK'
    };

    const reward = {
        id: rewardId, 
        title, 
        type, 
        learningTrackId: null, 
        courseId: null, 
        topicId: null, 
        topicItemId: null
    };

    switch(type) {
        case types.TRACK:
            reward.learningTrackId = contentId;
            break;

        case types.COURS:
            reward.courseId = contentId;
            break;

        case types.TOPIC:
            reward.topicId = contentId;
            break;

        case types.TPITM:
            reward.topicItemId = contentId;
            break;

        default:
            return null;
    }

    return reward;
}

function courseProgressRecordBuilder(id, seqNumber, topicIds, totalCourseXP) {
    return {
        id, 
        seqNumber, 
        topicsCompletedIds: [],
        topicsNotCompletedIds: topicIds.slice(), 
        nTopics: topicIds.length,
        totalCourseXP,
        totalXPEarned: 0
    };
}

function topicProgressRecordBuilder(id, seqNumber, topicItemRecords, totalTopicXP) {
    return {
        id, 
        seqNumber, 
        topicItemsCompleted: [],
        topicItemsNotCompleted: topicItemRecords.slice(), 
        nTopicItems: topicItemRecords.length,
        totalTopicXP,
        totalXPEarned: 0
    };
}

function topicItemRecordBuilder(id, seqNumber, xp) {
    return { id, seqNumber, xp };
}

//       if (!window.CourseProgress)
//         window.CourseProgress = {};
//       if (!window.TopicProgress)
//         window.TopicProgress = {};

