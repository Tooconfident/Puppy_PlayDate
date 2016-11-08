import axios from 'axios';

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  CHANGE_SIGNUP_USERNAME,
  CHANGE_SIGNUP_PASSWORD,
  CHANGE_SIGNUP_NAME,
  CHANGE_SIGNUP_EMAIL,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
  REQUEST_URL
} from './types';

/**
 * Login Form
 */
export function usernameChanged(username) {
  return {
    type: CHANGE_USERNAME,
    payload: username
  };
}

export function passwordChanged(password) {
  return {
    type: CHANGE_PASSWORD,
    payload: password
  };
}

export function loginUser({ username, password }) {
  console.log('loginUser action creator!');

  return dispatch => {
    return axios.post(`${REQUEST_URL}/session/login`, { username, password })
    .then(response => {
      console.log("Login successful", response);

      return dispatch({
        type: AUTH_USER,
        payload: response.data
      });

      // return Promise.resolve();
    })
    .catch(error => {
      console.log(error.response.data.error);

      dispatch({
        type: AUTH_ERROR,
      });

      return Promise.reject();
    })
    ;
  };
}

export function authenticateUser(user) {
  return {
    type: AUTH_USER,
    payload: user
  };
}

/**
 * Registration Form
 */
export function signupUsernameChanged(username) {
  return {
    type: CHANGE_SIGNUP_USERNAME,
    payload: username
  };
}

export function signupPasswordChanged(password) {
  return {
    type: CHANGE_SIGNUP_PASSWORD,
    payload: password
  };
}

export function signupNameChanged(name) {
  return {
    type: CHANGE_SIGNUP_NAME,
    payload: name
  };
}

export function signupEmailChanged(email) {
  return {
    type: CHANGE_SIGNUP_EMAIL,
    payload: email
  };
}

export function registerUser({ username, name, email, password }) {
  console.log("registerUser!", username, name, email, password);

  return dispatch => {
    return axios.post(`${REQUEST_URL}/users`, { username, name, email, password })
      .then((response) => {
        return dispatch({
          type: SIGNUP_USER_SUCCESS
        });
      })
      .catch(() => {
        console.log("There was a problem in the registration");

        dispatch({
          type: SIGNUP_USER_FAIL
        });

        return Promise.reject();
      });
  };
}
