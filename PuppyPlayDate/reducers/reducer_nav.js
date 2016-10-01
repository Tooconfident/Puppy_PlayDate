import { SET_ROUTE, SET_NAV } from '../actions/types';

const INITIAL_STATE = {
  navigator: null,
  route: null
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SET_NAV:
      return { ...state, navigator: action.payload };
    case SET_ROUTE:
      return { ...state, route: action.payload };
    default:
      return state;
  }
}
