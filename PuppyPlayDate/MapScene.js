import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TabBarIOS,
  Dimensions,
  Image,
  TouchableHighlight
} from 'react-native';

import MapView from 'react-native-maps';

var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

class MapScene extends Component {
      render() {
        var pins = [{
          latitude: 37.78482573289199,
          longitude: -122.4023278109328
        }];
        return (
          <MapView
            annotations={pins}
            onRegionChangeComplete={this.onRegionChangeComplete}
            style={styles.map}
            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            mapType={'standard'}
          >
          </MapView>
      )};
      onRegionChangeComplete(region) {
        console.log(region);
      }
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: width,
    height: height,
    borderWidth: 1,
  }
});


module.exports = MapScene;
