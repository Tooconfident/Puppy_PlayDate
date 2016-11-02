import { combineReducers } from 'redux';

// Custom Reducers
import DogsReducer from './reducer_dogs';
import PlaydatesReducer from './reducer_playdates';
import UsersReducer from './reducer_users';
import AuthReducer from './reducer_auth';
import SignupReducer from './reducer_signup';
import DogNewFormReducer from './reducer_dog_new_form';

// Combine all reducers here
// (don't forget to assign key-value pairs)
const rootReducer = combineReducers({
  dogs: DogsReducer,
  playdates: PlaydatesReducer,
  users: UsersReducer,
  auth: AuthReducer,
  signup: SignupReducer,
  dogNewForm: DogNewFormReducer
});

export default rootReducer;
