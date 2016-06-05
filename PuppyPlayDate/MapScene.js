import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TabBarIOS,
  Image
} from 'react-native';

class MapScene extends Component {
  render() {
    return (
      <Image source={require("./Resources/map.png")}/>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  }
})


module.exports = MapScene;
