import * as apiEndpoints from './apiEndpoints';

// BASE_API_URL: localhost:3001/api/v1
const { BASE_API_URL, VIEW_PREFIX } = apiEndpoints;

const responseFactory = (response, error) => {
    return {
        response,
        error
    };
};

export async function getAllTracks() {
    let path = `http://localhost:3001/api/v1/view`;  // ${BASE_API_URL}${VIEW_PREFIX}${apiEndpoints.ALL_TRACKS}
    const options = {
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
    };
    // using mode: "no-cors" will give you an opaque response, which doesn't seem to return data in the body.
    let response = await fetch(path, options);
    console.log('response: ', response);
    console.log('response body: ', response.body);
    console.log('response headers: ', response.headers);
    console.log('response status: ', response.status);
    let data = response.body ? await response.json() : { body: 'Error' };
    return responseFactory(data, null);
    // ALSO: try to connect FBInstant to app in App.js file using import statement
}

/**
 * 
tracks:1 Access to fetch at 'http://localhost:3001/api/v1/view' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
 */