// BASE_API_URL: localhost:3001/api/v1
import { BASE_API_URL, VIEW_PREFIX, POST_PREFIX, DELETE_PREFIX, ALL_TRACKS, TRACK } from './apiEndpoints';

const GET_REQUEST_OPTIONS = {
    method: "GET",
    headers: {
      "Accept": "application/json"
    },
    mode: "cors"
};

const responseFactory = (response, error) => {
    return {
        response,
        error
    };
};

export async function getAllTracks() {
    let path = `${BASE_API_URL}${VIEW_PREFIX}${ALL_TRACKS}`;  // http://localhost:3001/api/v1/view/tracks
    let response = await fetch(path, GET_REQUEST_OPTIONS);
    let data, error;
    if (response.body) {
        data = await response.json();
        error = null;
    }
    else {
        data = null;
        error = { 
            message: `GET request failed at /${VIEW_PREFIX}/${ALL_TRACKS} endpoint.`,
            response
        };
    }
    return responseFactory(data, error);
}

// response is object
export async function getTrack(trackId) {
    let path = `${BASE_API_URL}${VIEW_PREFIX}${TRACK}/${trackId}`;
    let response = await fetch(path, GET_REQUEST_OPTIONS);
    let data, error;
    if (response.body) {
        data = await response.json();
        error = null;
    }
    else {
        data = null;
        error = { 
            message: `GET request failed at /${VIEW_PREFIX}/${TRACK}/${trackId} endpoint.`,
            response
        };
    }
    return responseFactory(data, error);
}

export async function getAllCoursesInTrack(trackId) {
    let path = `${BASE_API_URL}${VIEW_PREFIX}${TRACK}/${trackId}/courses`;
    let response = await fetch(path, GET_REQUEST_OPTIONS);
    let data, error;
    if (response.body) {
        data = await response.json();
        error = null;
    }
    else {
        data = null;
        error = { 
            message: `GET request failed at /${VIEW_PREFIX}/${TRACK}/${trackId}/courses endpoint.`,
            response
        };
    }
    return responseFactory(data, error);
}

export async function getCourse(courseId) {
    let path = `${BASE_API_URL}${VIEW_PREFIX}/course/${courseId}`;
    let response = await fetch(path, GET_REQUEST_OPTIONS);
    let data = null, error = null;
    if (response.body) 
        data = await response.json();
    else 
        error = { 
            message: `GET request failed at /${VIEW_PREFIX}/course/${courseId} endpoint.`,
            response
        };
    return responseFactory(data, error);
}

export async function getAllTopicsInCourse(courseId) {
    let path = `${BASE_API_URL}${VIEW_PREFIX}/course/${courseId}/topics`;
    let response = await fetch(path, GET_REQUEST_OPTIONS);
    let data = null, error = null;
    if (response.body)
        data = await response.json();
    else
        error = { 
            message: `GET request failed at /${VIEW_PREFIX}/course/${courseId}/topics endpoint.`,
            response
        };
    return responseFactory(data, error);
}

export async function getAllTopicItemsInCourse(courseId) {
    let path = `${BASE_API_URL}${VIEW_PREFIX}/course/${courseId}/items`;
    let response = await fetch(path, GET_REQUEST_OPTIONS);
    let data = null, error = null;
    if (response.body) 
        data = await response.json();
    else
        error = { 
            message: `GET request failed at /${VIEW_PREFIX}/course/${courseId}/items endpoint.`,
            response
        };
    return responseFactory(data, error);
}

// for EditTopicScreenViewModel:
// getTopic(topicId)
// getAllTopicItemsInTopic(topicId)

export async function getTopicItem(topicId, seqNumber) {
    let path = `${BASE_API_URL}${VIEW_PREFIX}/topic/${topicId}/item/${seqNumber}`;
    let response = await fetch(path, GET_REQUEST_OPTIONS);
    let data = null, error = null;
    if (response.body)
        data = await response.json();
    else   
        error = { 
            message: `GET request failed at /${VIEW_PREFIX}/topic/${topicId}/item/${seqNumber} endpoint.`,
            response
        };
    // NOTE: ['learningTrackId'], ['courseId'], ['trackId']
    return responseFactory(data, error);
}

const post_request_options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"  // CORS "complex request" due to application/json .: handle pre-flight
    }
};

// BASE_API_URL: localhost:3001/api/v1
export async function createTrack(title, shortDescription, longDescription) {
    let path = `${BASE_API_URL}${POST_PREFIX}/create/track`;
    console.log('path: ', path);
    post_request_options.body = JSON.stringify({ title: title, shortDescription: shortDescription, longDescription: longDescription });
    console.log('POST request options: ', post_request_options);
    let response = await fetch(path, post_request_options);
    let data = null, error = null;
    if (response.body)
        data = await response.json();
    else   
        error = {
            message: `POST request failed at /${POST_PREFIX}/create/track endpoint`,
            response
        };
    return responseFactory(data, error);
}

/*
    // Example POST method implementation:
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
