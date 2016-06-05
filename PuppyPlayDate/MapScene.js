import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TabBarIOS,
  Image,
  TouchableHighlight
} from 'react-native';

class MapScene extends Component {
  render() {
    return (
      <View>
        <TouchableHighlight
          style={{marginTop: 20}}
          onPress={() => this.props.navigator.pop()
        }>
          <Text>Pop Me!</Text>
        </TouchableHighlight>
        <Image source={require("./Resources/map.png")}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  }
})


module.exports = MapScene;
