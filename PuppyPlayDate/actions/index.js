import axios from 'axios';

// Constants to define action type
export const FETCH_DOGS = 'FETCH_DOGS';
export const FETCH_DOG = 'FETCH_DOG';
export const FETCH_USER = 'FETCH_USER';
export const FETCH_PLAYDATES = 'FETCH_PLAYDATES';
export const FETCH_PLAYDATE = 'FETCH_PLAYDATE';

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
  const request = axios(`${REQUEST_URL}/dogs/${id}`);

  // return the action
  return {
    type: FETCH_DOG,
    payload: request // redux-promise will take this and replace with the resolved promise
  };
}

export function fetchUser(id) {
  const request = axios(`${REQUEST_URL}/users/${id}`);

  return {
    type: FETCH_USER,
    payload: request
  };
}

export function fetchPlaydates(userId) {
  const request = axios(`${REQUEST_URL}/playdates?user_id=${userId}`);

  return {
    type: FETCH_PLAYDATES,
    payload: request
  };
}

export function fetchPlaydate(id) {
  const request = axios(`${REQUEST_URL}/playdates/${id}`);

  return {
    type: FETCH_PLAYDATE,
    payload: request
  };
}
