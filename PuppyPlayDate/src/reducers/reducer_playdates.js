import {
  FETCH_USER_PLAYDATES,
  FETCH_PLAYDATES,
  FETCH_PLAYDATE
} from '../actions/types';

INITIAL_STATE = {
  all: [],
  own: [],
  playdate: null,
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_USER_PLAYDATES:
      return { ...state, own: action.payload.data };
    case FETCH_PLAYDATES:
      return { ...state, all: action.payload.data };
      break;
    case FETCH_PLAYDATE:
      return { ...state, playdate: action.payload.data };
      break;
    default:
      return state;
  }
}
