const PORT = 3001;

const BASE_URL = `http://localhost:${PORT}`;

const API_PREFIX = "/api/v1";

const BASE_API_URL = `${BASE_URL}${API_PREFIX}`;

const VIEW_PREFIX = "/view";
const POST_PREFIX = "/post";
const DELETE_PREFIX = "/delete";

const ALL_TRACKS = "/tracks";
const TRACK = "/track";

export {
    BASE_API_URL, VIEW_PREFIX, POST_PREFIX, DELETE_PREFIX, ALL_TRACKS, TRACK
};