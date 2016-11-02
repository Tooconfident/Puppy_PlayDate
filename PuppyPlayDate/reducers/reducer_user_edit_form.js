import {
  EDIT_USER_STATE_UPDATE,
  EDIT_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  username: '',
  name: '',
  email: '',
  password: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EDIT_USER_STATE_UPDATE:
      return { ...state, ...action.payload };
    case EDIT_USER_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
}
