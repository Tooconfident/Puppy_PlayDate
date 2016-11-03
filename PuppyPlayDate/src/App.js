/**
 * Puppy Playdate
 */

import React, { Component } from 'react';
import {
 StyleSheet,
} from 'react-native';

// For Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

//import promise from 'redux-promise';
import thunk from 'redux-thunk';

import reducers from './reducers';

// Our custom router for navigation
import Router from './Router';

// Add any middleware here
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <Router />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
});

export default App;
