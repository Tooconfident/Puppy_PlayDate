import {
  NEW_DOG_STATE_UPDATE,
  CREATE_DOG_SUCCESS,
  CREATE_DOG_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  breed: '',
  age: '',
  toy: '',
  avatar: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Update the state with the property that was changed
    case NEW_DOG_STATE_UPDATE:
      return { ...state, ...action.payload };
    case CREATE_DOG_SUCCESS:
      return INITIAL_STATE;
    case CREATE_DOG_FAIL:
      break;
    default:
    return state;
  }
}
