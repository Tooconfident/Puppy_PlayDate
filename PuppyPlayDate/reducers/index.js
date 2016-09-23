import { combineReducers } from 'redux';

// Custom Reducers
import DogsReducer from './reducer_dogs';
import PlaydatesReducer from './reducer_playdates';
import UsersReducer from './reducer_users';

// Combine all reducers here
// (don't forget to assign key-value pairs)
const rootReducer = combineReducers({
  dogs: DogsReducer,
  playdates: PlaydatesReducer,
  users: UsersReducer,
});

export default rootReducer;
