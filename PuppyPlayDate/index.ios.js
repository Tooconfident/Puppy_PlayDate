/**
 * Puppy Play Date
 * https://github.com/Tooconfident/Puppy_PlayDate
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import MainScene from './MainScene';

class PuppyPlayDateApp extends Component {
  renderScene(route, navigator){
    return(
      <route.component navigator={navigator} {...route.passProps}/>
    );
  }
  render() {
    return (
      <Navigator
        renderScene = {this.renderScene}
        initialRoute = {{
          title: 'PuppyPlayDate',
          component: MainScene,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('PuppyPlayDate', () => PuppyPlayDateApp);
