import {
  EDIT_DOG_STATE_UPDATE,
  EDIT_DOG_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  breed: '',
  age: '',
  toy: '',
  avatar: '',
  gender: '',
  description: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case EDIT_DOG_STATE_UPDATE:
      return { ...state, ...action.payload };
    case EDIT_DOG_SUCCESS:
      // this might be unnecessary
      return INITIAL_STATE;
    default:
      return state;
  }
}
