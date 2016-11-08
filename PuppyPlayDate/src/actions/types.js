import { Platform } from 'react-native';

// Constants to define action type

/**
 * Authentication
 */
export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const CHANGE_USERNAME = 'CHANGE_USERNAME';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

/**
 * Registration
 */
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAIL = 'SIGNUP_USER_FAIL';
export const CHANGE_SIGNUP_NAME = 'CHANGE_SIGNUP_NAME';
export const CHANGE_SIGNUP_USERNAME = 'CHANGE_SIGNUP_USERNAME';
export const CHANGE_SIGNUP_PASSWORD = 'CHANGE_SIGNUP_PASSWORD';
export const CHANGE_SIGNUP_EMAIL = 'CHANGE_SIGNUP_EMAIL';

/**
 * Users
 */
export const FETCH_USER = 'FETCH_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const EDIT_USER_STATE_UPDATE = 'EDIT_USER_STATE_UPDATE';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const FETCH_USER_PLAYDATES = 'FETCH_USER_PLAYDATES';

/**
 * Dogs
 */
export const FETCH_DOGS = 'FETCH_DOGS';
export const FETCH_DOG = 'FETCH_DOG';
export const CREATE_DOG = 'CREATE_DOG';
export const UPDATE_DOG = 'UPDATE_DOG';
export const NEW_DOG_STATE_UPDATE = 'NEW_DOG_STATE_UPDATE';
export const CREATE_DOG_SUCCESS = 'CREATE_DOG_SUCCESS';
export const CREATE_DOG_FAIL = 'CREATE_DOG_FAIL';
export const EDIT_DOG_STATE_UPDATE = 'EDIT_DOG_STATE_UPDATE';
export const EDIT_DOG_SUCCESS = 'EDIT_DOG_SUCCESS';

/**
 * Playdates
 */
export const FETCH_PLAYDATES = 'FETCH_PLAYDATES';
export const FETCH_PLAYDATE = 'FETCH_PLAYDATE';
export const EDIT_PLAYDATE_STATE_UPDATE = 'EDIT_PLAYDATE_STATE_UPDATE';
export const EDIT_PLAYDATE_SUCCESS = 'EDIT_PLAYDATE_SUCCESS';
export const CREATE_PLAYDATE = 'CREATE_PLAYDATE';
export const UPDATE_PLAYDATE = 'UPDATE_PLAYDATE';
export const NEW_PLAYDATE_STATE_UPDATE = 'NEW_PLAYDATE_STATE_UPDATE';
export const NEW_PLAYDATE_SUCCESS = 'NEW_PLAYDATE_SUCCESS';

/**
 * API Request URL
 */
// const REQUEST_URL = 'http://localhost:3000';
const ip = (Platform.OS === 'ios') ? 'localhost' : '10.0.2.2';
export const REQUEST_URL = `http://${ip}:3000`;
