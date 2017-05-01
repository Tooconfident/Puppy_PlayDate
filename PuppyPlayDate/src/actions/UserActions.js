import axios from 'axios';

import {
  FETCH_USER,
  UPDATE_USER,
  FETCH_USER_PLAYDATES,
  EDIT_USER_STATE_UPDATE,
  EDIT_USER_SUCCESS,
  REQUEST_URL
} from './types';

export function fetchUser(id) {
  const request = axios.get(`${REQUEST_URL}/users/${id}`);

  return dispatch => {
    return request.then(response => {
      return dispatch({
        type: FETCH_USER,
        payload: response
      });
    });
  };
}

export function fetchUserPlaydates(userId) {
  const request = axios.get(`${REQUEST_URL}/users/${userId}/playdates`);

  return dispatch => {
    request.then(response => {
      dispatch({
        type: FETCH_USER_PLAYDATES,
        payload: response
      });
    });
  };
}

/**
 * Edit User Form
 */
export function updateEditUserForm(user) {
  return {
    type: EDIT_USER_STATE_UPDATE,
    payload: user
  };
}

export function updateUser(userId, user) {
  return dispatch => {
    return axios.patch(`${REQUEST_URL}/users/${userId}`, user)
      .then((response) => {
        console.log(response);

        dispatch({
            type: EDIT_USER_SUCCESS
        });

        return dispatch({
          type: UPDATE_USER,
          payload: user
        });
      });
  };
}
