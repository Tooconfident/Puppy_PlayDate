import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
} from '../actions/types';

const INITIAL_STATE = {
  authenticated: null,
  error: null,
  username: '',
  password: '',
  user: null // right now user actually contains userId
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case AUTH_USER:
      console.log("AUTH_USER!!!");
      return { ...state, authenticated: true, user: action.payload, password: '', error: '' };
    case UNAUTH_USER:
      return { ...state, authenticated: false, user: null, error: '' };
    case AUTH_ERROR:
      console.log("AUTH_ERROR!!");
      return { ...state, error: action.payload, error: 'Authentication failed.', password: '' };
    case CHANGE_USERNAME:
      return { ...state, username: action.payload };
    case CHANGE_PASSWORD:
      return { ...state, password: action.payload };
    default:
      return state;
  }
}
