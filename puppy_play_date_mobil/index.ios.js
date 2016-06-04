/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  TextInput,
  View
} from 'react-native';

const styles = require('./style.js') // Global styles

class puppy_play_date_mobil extends Component {
  render() {
    return (
      <Image source={require('./images/0.jpg')} style={styles.bImage}>
        <View style={styles.blur}>
          <View style={styles.topMargin}></View>
            <View style={styles.container}>
              <TextInput placeholder='Email' style={styles.input} />
              <TextInput placeholder='Password' style={styles.input} />
            
            </View>
        </View>
      </Image>

    );
  }
}

AppRegistry.registerComponent('puppy_play_date_mobil', () => puppy_play_date_mobil);
