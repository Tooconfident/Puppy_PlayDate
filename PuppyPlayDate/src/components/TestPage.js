import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';

import MapScene from "./MapScene";
import PlayDates from "./PlayDates";

class TestPage extends Component {

  makeButtonLink(text, component) {
    return (
      <TouchableHighlight
        style={styles.button}
        onPress={() =>
          this.props.navigator.push({
            component,
          })
        }
      >
        <Text>{text}</Text>
      </TouchableHighlight>
    );
  }

  logout() {
    AsyncStorage.clear();
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is a test page</Text>
        {this.makeButtonLink("MapScene", MapScene)}
        {this.makeButtonLink("PlayDates", PlayDates)}
        <TouchableHighlight
          style={styles.button}
          onPress={this.logout.bind(this)}
        >
          <Text>Logout</Text>
        </TouchableHighlight>
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

export default TestPage;
