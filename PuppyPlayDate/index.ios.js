/**
 * Puppy Play Date
 * https://github.com/Tooconfident/Puppy_PlayDate
 * @flow
 */

import React, { Component } from 'react';
import {
 AppRegistry,
 Navigator,
 AsyncStorage,
} from 'react-native';


import MapScene from './MapScene';
import MainScene from './MainScene';
import WelcomePage from './WelcomePage';

const styles = require('./style.js')

class PuppyPlayDateApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
        // AsyncStorage.clear()
        AsyncStorage.getItem("userID").then((value) => {
          console.log('current.val '+ value);
            this.setState({"userID": value});
        }).done();
    }
  renderScene(route, navigator){
    console.log("renderScene was called: passProps: " + route.passProps);
    return(
      <route.component navigator={navigator} {...route.passProps}/>
    );
  }
  render() {

    if (this.state.userID != undefined){
      return (<MainScene/>);
    } else {
      return (
        <Navigator
        sceneStyle={styles.container}
        ref={(navigator) => { this.navigator = navigator; }}
        renderScene={this.renderScene}
        tintColor='#D6573D'
        barTintColor='#FFFFFD'
        titleTextColor='#D6573D'
        navigationBarHidden={true}
        initialRoute={{
          title: 'Main',
          component: WelcomePage,
        }}
      >
      );

        <WelcomePage/>
        </Navigator>
      );
    }

  }


}
AppRegistry.registerComponent('PuppyPlayDate', () => PuppyPlayDateApp);
