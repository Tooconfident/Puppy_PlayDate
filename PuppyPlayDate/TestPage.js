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
import PlayDates from "./PlayDates";

class TestPage extends Component {

  componentDidMount(){
    this.props.navigator.pop();
  }

  makeButtonLink(text, component) {
    return (
      <TouchableHighlight
        style={styles.button}
        onPress={() =>
          this.props.navigator.push({
            component: component,
          })
        }
      >
        <Text>{text}</Text>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is a test page</Text>
        {this.makeButtonLink("MapScene", MapScene)}
        {this.makeButtonLink("PlayDates", PlayDates)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 10,
    backgroundColor: 'antiquewhite'
  },
});

module.exports = TestPage;