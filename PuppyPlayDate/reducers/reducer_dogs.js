import { FETCH_DOGS, FETCH_DOG } from '../actions/index';

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
    default:
      // Always return the state as it is if no action matched
      return state;
  }
}
