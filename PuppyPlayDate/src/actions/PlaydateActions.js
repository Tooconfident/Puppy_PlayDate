import axios from 'axios';

import {
  FETCH_PLAYDATES,
  FETCH_PLAYDATE,
  CREATE_PLAYDATE,
  UPDATE_PLAYDATE,
  NEW_PLAYDATE_STATE_UPDATE,
  EDIT_PLAYDATE_STATE_UPDATE,
  EDIT_PLAYDATE_SUCCESS,
  REQUEST_URL
} from './types';

export function fetchPlaydates() {
  const request = axios.get(`${REQUEST_URL}/playdates`);

  return dispatch => {
    request.then(response => {
      // Update the playdates after successful request
      dispatch({
        type: FETCH_PLAYDATES,
        payload: response
      });
    });
  };
}

export function fetchPlaydate(id) {
  const request = axios.get(`${REQUEST_URL}/playdates/${id}`);

  return dispatch => {
    return request.then(response => {
      return dispatch({
        type: FETCH_PLAYDATE,
        payload: response
      });
    });
  };
}

/**
 * New Playdate Form
 */
export function updateNewPlaydateForm(playdate) {
  return {
    type: NEW_PLAYDATE_STATE_UPDATE,
    payload: playdate
  };
}
export function createPlaydate(playdate) {
  const request = axios.post(`${REQUEST_URL}/playdates`, playdate);

  return dispatch => {
    return request.then(response => {
      return dispatch({
        type: CREATE_PLAYDATE,
        payload: response
      });
    })
    .catch(() => {
      console.log("Error creating new playdate");

      return Promise.reject();
    });
  };
}

/**
 * Edit Playdate Form
 */
export function updateEditPlaydateForm(playdate) {
  return {
    type: EDIT_PLAYDATE_STATE_UPDATE,
    payload: playdate
  };
}

export function updatePlaydate(playdate) {
  const request = axios.patch(`${REQUEST_URL}/playdates/${playdate.id}`, playdate);

  return dispatch => {
    return request.then(response => {
      dispatch({
        type: EDIT_PLAYDATE_SUCCESS
      });

      return dispatch({
        type: UPDATE_PLAYDATE,
        payload: playdate
      });
    });
  };
}
