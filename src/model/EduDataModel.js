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
        error = { message: `GET request failed at ${ALL_TRACKS} endpoint.` };
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
        error = { message: `GET request failed at ${TRACK}/${trackId} endpoint.` };
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
        error = { message: `GET request failed at ${TRACK}/${trackId}/courses endpoint.` };
    }
    return responseFactory(data, error);
}

const mcq = {
  type: "MCQ",
  title: "MCQ Question",
  xp: 200,
  content: "",
  seqNumber: 2, 
  instructions: ["1 Lorem ipsum sit dolor amet consectetur adipsicing.", "2 Lorem ipsum sit dolor amet consectetur adipsicing.", "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."], 
  hints: ["Lorem ipsum sit dolor amet consectetur adipsicing.", "Lorem ipsum sit dolor amet consectetur."], 
  mcqOptions: ["Option A", "Option B", "Option C", "Option D"], 
  mcqAnswerIndex: 1, 
  cqAnswer: null, 
  saqAnswers: [], 
  tfqAnswer: null
};

export async function getTopicItem(topicId, seqNumber) {
    return responseFactory({ response: mcq }, null);
}