/**
 * Puppy Play Date
 * https://github.com/Tooconfident/Puppy_PlayDate
 * @flow
 */

import React, { Component } from 'react';
import {
 AppRegistry,
 NavigatorIOS,
 StyleSheet,
} from 'react-native';

// For Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';
import promise from 'redux-promise';

// Add any middleware here
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

import Login from './components/Login';
import MainScene from './components/MainScene';
import MapScene from './components/MapScene';
import WelcomePage from './components/WelcomePage';

let styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
});
class PuppyPlayDateApp extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }
  //
  // componentDidMount() {
  //   AsyncStorage.clear()
  //   AsyncStorage.getItem("userID").then((value) => {
  //     console.log('current.val '+ value);
  //       this.setState({"userID": value});
  //   }).done();
  // }
  //
  // renderScene(route, navigator){
  //   console.log("renderScene was called: passProps: " + route.passProps);
  //   return(
  //     <route.component navigator={navigator} {...route.passProps}/>
  //   );
  // }
  //
  //
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
AppRegistry.registerComponent('PuppyPlayDate', () => PuppyPlayDateApp);
