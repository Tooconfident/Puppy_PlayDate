import axios from 'axios';

import {
  FETCH_DOGS,
  FETCH_DOG,
  CREATE_DOG,
  UPDATE_DOG,
  CREATE_DOG_SUCCESS,
  NEW_DOG_STATE_UPDATE,
  EDIT_DOG_STATE_UPDATE,
  EDIT_DOG_SUCCESS,
  REQUEST_URL
} from './types';

export function fetchDogs(userId) {
  const request = fetch(`${REQUEST_URL}/users/${userId}/dogs`);

  return dispatch => {
    request.then(response => {
      dispatch({
        type: FETCH_DOGS,
        payload: response
      });
    });
  };
}

export function fetchDog(id) {
  const request = axios.get(`${REQUEST_URL}/dogs/${id}`);

  // return the action
  return dispatch => {
    return request.then(response => {
      return dispatch({
        type: FETCH_DOG,
        payload: response // redux-promise will take this and replace with the resolved promise
      });
    });
  };
}

/**
 * New Dog Form
 */
export function updateNewDogForm(dog) {
  return {
    type: NEW_DOG_STATE_UPDATE,
    payload: dog
  };
}

export function createDog(dog) {
  const request = axios.post(`${REQUEST_URL}/dogs`, dog);

  return dispatch => {
    return request.then(response => {
      dispatch({
        type: CREATE_DOG_SUCCESS
      });

      return dispatch({
        type: CREATE_DOG,
        payload: response
      });
    })
    .catch(() => {
      console.log("Failed to create new dog profile");
      return Promise.reject();
    });
  };
}

/**
 * Edit Dog Form
 */
export function updateEditDogForm(dog) {
  return {
   type: EDIT_DOG_STATE_UPDATE,
   payload: dog
  };
}

export function updateDog(dogId, dog) {
  console.log(dogId, dog);
  const request = axios.patch(`${REQUEST_URL}/dogs/${dogId}`, dog);

  return dispatch => {
    return request.then(response => {
      console.log(response);

      dispatch({
        type: EDIT_DOG_SUCCESS
      });

      return dispatch({
        type: UPDATE_DOG,
        payload: dog
      });
    });
  };
}
