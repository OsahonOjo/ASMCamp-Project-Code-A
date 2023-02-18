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
    // NOTE: ['learningTrackId'], ['courseId'], ['trackId']
    return responseFactory(data, error);
}

// BASE_API_URL: localhost:3001/api/v1
export async function getAllTracks() {
    let path = `${BASE_API_URL}${VIEW_PREFIX}${ALL_TRACKS}`;
    return callFetchAPI(REQUEST_METHODS.GET, path, GET_REQUEST_OPTIONS);
}

export async function getTrack(trackId) {
    let path = `${BASE_API_URL}${VIEW_PREFIX}${TRACK}/${trackId}`;
    return callFetchAPI(REQUEST_METHODS.GET, path, GET_REQUEST_OPTIONS);
}

export async function getAllCoursesInTrack(trackId) {
    let path = `${BASE_API_URL}${VIEW_PREFIX}${TRACK}/${trackId}/courses`;
    return callFetchAPI(REQUEST_METHODS.GET, path, GET_REQUEST_OPTIONS);
}

export async function getCourse(courseId) {
    let path = `${BASE_API_URL}${VIEW_PREFIX}/course/${courseId}`;
    return callFetchAPI(REQUEST_METHODS.GET, path, GET_REQUEST_OPTIONS);
}

export async function getAllTopicsInCourse(courseId) {
    let path = `${BASE_API_URL}${VIEW_PREFIX}/course/${courseId}/topics`;
    return callFetchAPI(REQUEST_METHODS.GET, path, GET_REQUEST_OPTIONS);
}

export async function getAllTopicItemsInCourse(courseId) {
    let path = `${BASE_API_URL}${VIEW_PREFIX}/course/${courseId}/items`;
    return callFetchAPI(REQUEST_METHODS.GET, path, GET_REQUEST_OPTIONS);
}

export async function getTopic(topicId) {
    let path = `${BASE_API_URL}${VIEW_PREFIX}/topic/${topicId}`;
    return callFetchAPI(REQUEST_METHODS.GET, path, GET_REQUEST_OPTIONS);
}

export async function getAllTopicItemsInTopic(topicId) {
    let path = `${BASE_API_URL}${VIEW_PREFIX}/topic/${topicId}/items`;
    return callFetchAPI(REQUEST_METHODS.GET, path, GET_REQUEST_OPTIONS);
}

export async function getTopicItem(topicId, seqNumber) {
    let path = `${BASE_API_URL}${VIEW_PREFIX}/topic/${topicId}/item/${seqNumber}`;
    return callFetchAPI(REQUEST_METHODS.GET, path, GET_REQUEST_OPTIONS);
}

export async function getTopicItemById(topicItemId) {
    let path = `${BASE_API_URL}${VIEW_PREFIX}/item/${topicItemId}`;
    return callFetchAPI(REQUEST_METHODS.GET, path, GET_REQUEST_OPTIONS);
}

const postRequestOptionsFactory = (body) => {
    return {
        method: "POST",
        mode: "cors",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"  // CORS "complex request" due to application/json .: handle pre-flight
        }, 
        body
    };
};

// BASE_API_URL: localhost:3001/api/v1
export async function createTrack(title, shortDescription, longDescription) {
    let path = `${BASE_API_URL}${POST_PREFIX}/create/track`;
    let post_request_options = postRequestOptionsFactory(JSON.stringify({ title: title, shortDescription: shortDescription, longDescription: longDescription }));
    return callFetchAPI(REQUEST_METHODS.POST, path, post_request_options);
}

export async function createCourseEntity(learningTrackId, title, seqNumber, shortDescription, longDescription) {
    let path = `${BASE_API_URL}${POST_PREFIX}/create/course`;
    let post_request_options = postRequestOptionsFactory(JSON.stringify({ learningTrackId: learningTrackId, title: title, seqNumber: seqNumber, shortDescription: shortDescription, longDescription: longDescription }));
    return callFetchAPI(REQUEST_METHODS.POST, path, post_request_options);
}

export async function createTopicEntity(learningTrackId, courseId, title, seqNumber, description) {
    let path = `${BASE_API_URL}${POST_PREFIX}/create/topic`;
    let post_request_options = postRequestOptionsFactory(JSON.stringify({ learningTrackId, courseId, title, seqNumber, description }));
    return callFetchAPI(REQUEST_METHODS.POST, path, post_request_options);
}

export async function createTopicItemEntity(topicItemData) {
    let path = `${BASE_API_URL}${POST_PREFIX}/create/item`;
    let post_request_options = postRequestOptionsFactory(JSON.stringify(topicItemData));
    return callFetchAPI(REQUEST_METHODS.POST, path, post_request_options);
}

export async function updateTrack(trackId, title, shortDescription, longDescription) {
    let path = `${BASE_API_URL}${POST_PREFIX}/update/track`;
    let post_request_options = postRequestOptionsFactory(JSON.stringify({ id: trackId, title: title, shortDescription: shortDescription, longDescription: longDescription }));
    return callFetchAPI(REQUEST_METHODS.POST, path, post_request_options);
}

export async function updateCourseEntity(courseId, learningTrackId, title, seqNumber, shortDescription, longDescription) {
    let path = `${BASE_API_URL}${POST_PREFIX}/update/course`;
    let post_request_options = postRequestOptionsFactory(JSON.stringify({ 
        id: courseId, learningTrackId, title, seqNumber, shortDescription, longDescription }));
    return callFetchAPI(REQUEST_METHODS.POST, path, post_request_options);
}

export async function updateTopicEntity(id, learningTrackId, courseId, title, seqNumber, description) {
    let path = `${BASE_API_URL}${POST_PREFIX}/update/topic`;
    let post_request_options = postRequestOptionsFactory(JSON.stringify({ id, learningTrackId, courseId, title, seqNumber, description }));
    return callFetchAPI(REQUEST_METHODS.POST, path, post_request_options);
}

export async function updateTopicItemEntity(topicItemData) {
    let path = `${BASE_API_URL}${POST_PREFIX}/update/item`;
    let post_request_options = postRequestOptionsFactory(JSON.stringify(topicItemData));
    return callFetchAPI(REQUEST_METHODS.POST, path, post_request_options);
}

/*
    // Example fetch API implementation (POST method):
    async function postData(url = '', data = {}) {

        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
                                       // body must be stringified
        });

        return response.json(); // parses JSON response into native JavaScript objects
    }
*/
