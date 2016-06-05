import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

class MainScene extends Component {
  render(){
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Hola a todos!</Text>
      </View>

    );
  }
}

module.exports = MainScene;
