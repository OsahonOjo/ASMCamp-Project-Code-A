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
    let path = `${BASE_API_URL}${VIEW_PREFIX}/template/progress/${trackId}`;
    const { response, error } = await callFetchAPI(REQUEST_METHODS.GET, path, GET_REQUEST_OPTIONS);  // response: { response: {} }
    if (error) {
        console.log(error.message);
        return;
    }

    // window.LearningTrackProgress, .CourseProgress, .TopicProgress init. at game start
    const learningTrackProgress = response.response.learningTrackProgress;
    window.LearningTrackProgress[learningTrackProgress.id] = learningTrackProgress;

    const courseProgress = response.response.courseProgress;  // { id1: {}, id2: {} }
    Object.keys(courseProgress).forEach(key => {
        window.CourseProgress[key] = courseProgress[key];
    });

    const topicProgress = response.response.topicProgress;  // { id1: {}, id2: {} }
    Object.keys(topicProgress).forEach(key => {
        window.TopicProgress[key] = topicProgress[key];
    });
}

export function userIsEnrolledInTrack(trackId) {
    let record = window.LearningTrackProgress[trackId];
    return record ? true : false;
}

export function userIsEnrolledInCourse(courseId) {
    let record = window.CourseProgress[courseId];
    return record ? true : false;
}

export function userIsEnrolledInTopic(topicId) {
    let record = window.TopicProgress[topicId];
    return record ? true : false;
}

function topicItemIsComplete(topicId, topicItemId) {
    let topicItem = window.TopicProgress[topicId].topicItemsCompleted.find(element => element.id == topicItemId);
    return topicItem && Object.keys(topicItem).length != 0 ? true : false;
}

// NB: New Terminology: 
// Progress data: related to XP earned and completing items, topics, etc.
// Game data: includes progress data, rewards, leaderboard standings, etc.

export function updateProgress(trackId, courseId, topicId, topicItemId) {
    if (topicItemIsComplete(topicId, topicItemId)){
        console.log(`topic item ${topicItemId} has already been completed`);
        return;
    }
    let { xpEarned } = updateTopicProgress(topicId, topicItemId);
    updateCourseProgress(courseId, topicId, xpEarned);
    updateLearningTrackProgress(trackId, courseId, xpEarned);
}

function updateTopicProgress(topicId, topicItemId) {
    // move topic item of interest from not completed to completed
    let topicItemsCompleted = window.TopicProgress[topicId].topicItemsCompleted;
    let topicItemsNotCompleted = window.TopicProgress[topicId].topicItemsNotCompleted;
    let topicItemIndex = topicItemsNotCompleted.findIndex(element => element.id == topicItemId);
    let topicItem = topicItemsNotCompleted[topicItemIndex];
    topicItemsCompleted[topicItemIndex] = Object.assign({}, topicItem);
    topicItemsNotCompleted[topicItemIndex] = {};
    
    // increment totalXPEarned
    window.TopicProgress[topicId].totalXPEarned += topicItem.xp;

    return { xpEarned: topicItem.xp };
}

// TODO: verify this function works
function updateCourseProgress(courseId, topicId, xp) {
    // increment totalXPEarned
    let courseProgress = window.CourseProgress[courseId];
    courseProgress.totalXPEarned += xp;

    // if topic is complete, move from not completed to completed 
    let topicProgressPercent = getTopicProgressInfo(topicId).percentage;
    // console.log('topicProgressPercent: ', topicProgressPercent);
    if (topicProgressPercent >= 100) {
        let topicsCompletedIds = courseProgress.topicsCompletedIds;
        let topicsNotCompletedIds = courseProgress.topicsNotCompletedIds;
        let topicIdIndex = topicsNotCompletedIds.findIndex(element => element == topicId);
        topicsCompletedIds[topicIdIndex] = topicId;
        topicsNotCompletedIds[topicIdIndex] = "";
    }
}

// TODO: verify this function works
function updateLearningTrackProgress(trackId, courseId, xp) {
    // increment totalXPEarned
    let learningTrackProgress = window.LearningTrackProgress[trackId];
    learningTrackProgress.totalXPEarned += xp;

    // if course is complete, move from not completed to completed 
    let courseProgressPercent = getCourseProgressInfo(courseId).percentage;
    // console.log('courseProgressPercent: ', courseProgressPercent);
    if (courseProgressPercent >= 100) {
        let coursesCompletedIds = learningTrackProgress.coursesCompletedIds;
        let coursesNotCompletedIds = learningTrackProgress.coursesNotCompletedIds;
        let courseIdIndex = coursesNotCompletedIds.findIndex(element => element == courseId);
        coursesCompletedIds[courseIdIndex] = courseId;
        coursesNotCompletedIds[courseIdIndex] = "";
    }
}

// getXProgress() functions return null if user is not enrolled
export function getTrackProgressInfo(trackId) {
    if (!userIsEnrolledInTrack(trackId))
        return null;
    let record = window.LearningTrackProgress[trackId];  // if no record, returns undefined 
    if (!record || Object.keys(record).length == 0)
        return null;
    return {
        percentage: Math.round((record.totalXPEarned / record.totalTrackXP) * 100),
        nCourses: record.nCourses
    };
}

export function getCourseProgressInfo(courseId) {
    if (!userIsEnrolledInCourse(courseId))
        return null;
    let record = window.CourseProgress[courseId];  // if no record, returns undefined 
    if (!record || Object.keys(record).length == 0)
        return null;
    return {
        percentage: Math.round((record.totalXPEarned / record.totalCourseXP) * 100),
        nTopics: record.nTopics
    };
}

export function getTopicProgressInfo(topicId) {
    if (!userIsEnrolledInTopic(topicId))
        return null;
    let record = window.TopicProgress[topicId];  // if no record, returns undefined 
    if (!record || Object.keys(record).length == 0)
        return null;
    return {
        percentage: Math.round((record.totalXPEarned / record.totalTopicXP) * 100),
        nTopicItems: record.nTopicItems
    };
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