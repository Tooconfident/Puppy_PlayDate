import { combineReducers } from 'redux';

// Custom Reducers
import DogsReducer from './reducer_dogs';

// Combine all reducers here
// (don't forget to assign key-value pairs)
const rootReducer = combineReducers({
  dogs: DogsReducer,
});

export default rootReducer;
