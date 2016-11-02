import {
  CREATE_DOG_SUCCESS,
  CREATE_DOG_FAIL
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
    case CREATE_DOG_SUCCESS:
      return INITIAL_STATE;
    case CREATE_DOG_FAIL:
      break;
    default:
    return state;
  }
}
