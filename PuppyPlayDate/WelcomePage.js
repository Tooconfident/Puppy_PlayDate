import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  Image,
  TouchableHighlight
} from 'react-native';

class WelcomePage extends Component {
  render() {
    return (
      <Image style={styles.bgImage} source={require('./Resources/0.jpg')}>
        <Text style={styles.bigText}>
          Puppy Play Date
        </Text>

        <Text style={styles.text}>
          Find your dog perfect match today!
        </Text>
        <TouchableHighlight
          style={styles.button}>
            <Text style={styles.buttonText}>
              Signup
            </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}>

        <Text style={styles.buttonText}>
          Login
        </Text>
      </TouchableHighlight>
      </Image>
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
    fontSize: 20,
  },
  bigText: {
    fontSize: 30,
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
  },
  image: {
    height: 100,
    width: 100,
  },
  bgImage: {
    flex: 1,
    width: null,
    height: null,
  }
});

module.exports = WelcomePage;
