import {
  NEW_PLAYDATE_STATE_UPDATE,
  NEW_PLAYDATE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  address: '',
  time_day: '',
  description: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case NEW_PLAYDATE_STATE_UPDATE:
      return { ...state, ...action.payload };
    case NEW_PLAYDATE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
}
