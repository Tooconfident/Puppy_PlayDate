import {
  DOG_CREATE_SUCCESS,
  DOG_CREATE_FAIL
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

    default:
    return state;
  }
}
