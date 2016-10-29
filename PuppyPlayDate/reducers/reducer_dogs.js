import { FETCH_DOGS, FETCH_DOG, UPDATE_DOG } from '../actions/types';

// Initial application state
const INITIAL_STATE = {
  all: [],
  dog: null
};

// Reducer function (returns a piece of app state)
export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_DOGS:
      return { ...state, all: action.payload.data };
      break;
    case FETCH_DOG:
      return { ...state, dog: action.payload.data };
      break;
    case UPDATE_DOG:
      return { ...state, dog: action.payload }
    default:
      // Always return the state as it is if no action matched
      return state;
  }
}
