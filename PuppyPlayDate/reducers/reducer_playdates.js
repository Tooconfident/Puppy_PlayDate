import { FETCH_PLAYDATES, FETCH_PLAYDATE } from '../actions/index';

INITIAL_STATE = {
  all: [],
  playdate: null,
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_PLAYDATES:
      console.log("FETCHPLAYDATES REDUCER!!");
      return { ...state, all: action.payload.data };
      break;
    case FETCH_PLAYDATE:
      return { ...state, playdate: action.payload.data };
      break;
    default:
      return state;
  }
}
