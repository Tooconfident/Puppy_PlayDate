import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

class MainScene extends Component {
  render(){
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Hola a todos!</Text>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText}>
            Dogs
          </Text>
        </TouchableHighlight>
      </View>

    );
  }
}

const styles = StyleSheet.create({
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
  }
});


module.exports = MainScene;
