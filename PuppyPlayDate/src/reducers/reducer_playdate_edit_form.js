import {
  EDIT_PLAYDATE_STATE_UPDATE,
  EDIT_PLAYDATE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  address: '',
  time_day: '',
  description: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EDIT_PLAYDATE_STATE_UPDATE:
      return { ...state, ...action.payload };
    case EDIT_PLAYDATE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
