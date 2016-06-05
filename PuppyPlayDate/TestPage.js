import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

import MapScene from "./MapScene";

class TestPage extends Component {
  render() {
    return (
      <View>
        <Text>This is a test page</Text>
        <TouchableHighlight onPress={() =>
          this.props.navigator.push({
            component: MapScene,
          })
        }>
          <Text>Hola</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = TestPage;
