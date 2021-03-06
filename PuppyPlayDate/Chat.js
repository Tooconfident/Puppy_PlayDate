import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  NavigatorIOS,
  Image,
  TouchableHighlight
} from 'react-native';

class DogProfile extends Components {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          This is Dog Profile
        </Text>
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
  text: {
    fontSize: 14,
  }
});

module.exports = DogProfile;
