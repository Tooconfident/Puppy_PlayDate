import { FETCH_USER, UPDATE_USER } from '../actions/types';

const INITIAL_STATE = {
  user: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, user: action.payload.data };
    case UPDATE_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
