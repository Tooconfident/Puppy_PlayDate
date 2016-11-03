/**
 * Puppy Playdate
 */

import React, { Component } from 'react';
import {
 NavigatorIOS,
 StyleSheet,
} from 'react-native';

// For Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

//import promise from 'redux-promise';
import thunk from 'redux-thunk';

import reducers from '../reducers';

import Login from './auth/Login';

// Add any middleware here
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <NavigatorIOS
          style={styles.wrapper}
          initialRoute={{
            title: 'Puppy Playdate',
            component: Login,
          }}
        />
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
