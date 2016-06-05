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

class DogCreate extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Welcome USER to PuppyPlayDate!
        </Text>
        <Text style={styles.bigText}>
          Tell us About your Dog
        </Text>
        <TextInput
          placeholder="Dog Name"
          style={styles.input}
        />
        <TextInput
          placeholder="Breed"
          style={styles.input}
        />
        <TextInput
          placeholder="Age"
          style={styles.input}
        />
        <TextInput
          placeholder="Favorite Toy"
          style={styles.input}
        />
        <TouchableHighlight
          style={styles.cameraButton}>
          <Image source={require("./Resources/dog_avatar.png")} style={styles.image}>
            <Text>
              Add Photo
            </Text>
          </Image>  
        </TouchableHighlight>
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
  bigText: {
    fontSize: 60,
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
  }
});

module.exports = DogCreate;
