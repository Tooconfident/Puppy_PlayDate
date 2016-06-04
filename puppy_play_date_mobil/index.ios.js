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
  TouchableHighlight,
  TextInput,
  View
} from 'react-native';

const styles = require('./style.js') // Global styles

// class puppy_play_date_mobil extends Component {
var puppy_play_date_mobil = React.createClass({
  render: function() {
    return (
      <Image source={require('./images/0.jpg')} style={styles.bImage}>
        <View style={styles.blur}>
          <View style={styles.topMargin}></View>
            <View style={styles.container}>
              <TextInput placeholder='Email' style={styles.input} onPress={this.buttonPress()} />
              <TextInput placeholder='Password' style={styles.input} />
              <TouchableHighlight style={[styles.button,styles.center]}
               underlayColor= "#888" onPress={this.buttonPress()} >
                <Text>
                  Let's Go!
                </Text>
              </TouchableHighlight>
            </View>
        </View>
      </Image>

    );
  },// render fn
  buttonPress: function(){
    return(
        console.log('this one')
    );
  }

});
// }

AppRegistry.registerComponent('puppy_play_date_mobil', () => puppy_play_date_mobil);
