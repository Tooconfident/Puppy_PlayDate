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

import Login from './Login';
import MainScene from './MainScene';
import MapScene from './MapScene';
import WelcomePage from './WelcomePage';

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
      <NavigatorIOS
        style={styles.wrapper}
        initialRoute= {{
          title: 'Login Page',
          component: Login,
        }}/>
      );
  }
}
AppRegistry.registerComponent('PuppyPlayDate', () => PuppyPlayDateApp);
