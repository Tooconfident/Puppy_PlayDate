import {
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
  CHANGE_SIGNUP_USERNAME,
  CHANGE_SIGNUP_PASSWORD,
  CHANGE_SIGNUP_EMAIL,
  CHANGE_SIGNUP_NAME
} from '../actions/types';

const INITIAL_STATE = {
  error: null,
  username: '',
  password: '',
  name: '',
  email: '',
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGNUP_USER_SUCCESS:
      return { ...state, username: '', name: '', password: '', email: '', error: '' };
    case SIGNUP_USER_FAIL:
      return { ...state, error: 'Registration failed.' };
    case CHANGE_SIGNUP_USERNAME:
      return { ...state, username: action.payload };
    case CHANGE_SIGNUP_PASSWORD:
      return { ...state, password: action.payload };
      case CHANGE_SIGNUP_NAME:
        return { ...state, name: action.payload };
      case CHANGE_SIGNUP_EMAIL:
        return { ...state, email: action.payload };
    default:
      return state;
  }
}
