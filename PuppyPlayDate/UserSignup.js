import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  Navigator,
  Image,
  TouchableHighlight
} from 'react-native';

class UserSignup extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Sign Up
        </Text>
        <TextInput
          placeholder="Username"
          style={styles.input}
        />
        <TextInput
          placeholder="Name"
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
        />
        <TouchableHighlight
          style={styles.button}>
          <Text style={styles.buttonText}>
            Sign Up
          </Text>
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
  text: {
    fontSize: 40,
  },
  button: {
    height: 36,
    backgroundColor: "#48bbec",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "stretch",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center",
  },
  input: {
    height: 40,
  }
});

module.exports = UserSignup;
