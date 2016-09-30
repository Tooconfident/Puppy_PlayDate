import axios from 'axios';

// Import all action types
export * from './types';

const REQUEST_URL = 'http://localhost:3000';

// Action creators
export function fetchDogs(userId) {
  const request = fetch(`${REQUEST_URL}/users/${userId}/dogs`);

  return {
    type: FETCH_DOGS,
    payload: request
  }
}

export function fetchDog(id) {
  const request = axios.get(`${REQUEST_URL}/dogs/${id}`);

  // return the action
  return {
    type: FETCH_DOG,
    payload: request // redux-promise will take this and replace with the resolved promise
  };
}

export function createDog(dog) {
  const request = axios.post(`${REQUEST_URL}/dogs`, dog);

  return {
    type: CREATE_DOG,
    payload: request
  };
}

export function updateDog(dog) {
  const request = axios.patch(`${REQUEST_URL}/dogs/${dog.id}`, dog);

  return {
    type: UPDATE_DOG,
    payload: request
  };
}

export function fetchUser(id) {
  const request = axios.get(`${REQUEST_URL}/users/${id}`);

  return {
    type: FETCH_USER,
    payload: request
  };
}

export function fetchPlaydates() {
  const request = axios.get(`${REQUEST_URL}/playdates`);

  return {
    type: FETCH_PLAYDATES,
    payload: request
  };
}

export function fetchUserPlaydates(userId) {
  const request = axios.get(`${REQUEST_URL}/users/${userId}/playdates`);

  return {
    type: FETCH_USER_PLAYDATES,
    payload: request
  };
}

export function fetchPlaydate(id) {
  const request = axios.get(`${REQUEST_URL}/playdates/${id}`);

  return {
    type: FETCH_PLAYDATE,
    payload: request
  };
}

export function createPlaydate(playdate) {
  const request = axios.post(`${REQUEST_URL}/playdates`, playdate);

  return {
    type: CREATE_PLAYDATE,
    payload: request
  };
}

export function updatePlaydate(playdate) {
  const request = axios.patch(`${REQUEST_URL}/playdates/${playdate.id}`, playdate);

  return {
    type: UPDATE_PLAYDATE,
    payload: request
  }
}

export function loginUser({ username, password }) {
  axios.post(`${REQUEST_URL}/session/login`, { username, password })
    .then(response => {
      console.log("Login successful", response);

      // Login successfully, so store user id locally
      AsyncStorage.setItem("userID", String(response.data));

      return {
        type: AUTH_USER
      };
    })
    .catch(error => {
      console.log(error.response.data.error);
    })
    ;
}
