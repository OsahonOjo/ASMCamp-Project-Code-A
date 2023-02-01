// BASE_API_URL: localhost:3001/api/v1
import { BASE_API_URL, VIEW_PREFIX, ALL_TRACKS, TRACK } from './apiEndpoints';

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
            message: `GET request failed at ${ALL_TRACKS} endpoint.`,
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
            message: `GET request failed at ${TRACK}/${trackId} endpoint.`,
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
            message: `GET request failed at ${TRACK}/${trackId}/courses endpoint.`,
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
            message: `GET request failed at /course/${courseId} endpoint.`,
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
            message: `GET request failed at /course/${courseId}/topics endpoint.`,
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
            message: `GET request failed at /course/${courseId}/items endpoint.`,
            response
        };
    return responseFactory(data, error);
}

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
            message: `GET request failed at /topic/${topicId}/item/${seqNumber} endpoint.`,
            response
        };
    // NOTE: ['learningTrackId'], ['courseId'], ['trackId']
    return responseFactory(data, error);
}
