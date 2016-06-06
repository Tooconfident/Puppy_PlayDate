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
const LATITUDE = 37.7;
const LONGITUDE = -122.2;
const LATITUDE_DELTA = 1.2;
const LONGITUDE_DELTA = 1.2;

class MapScene extends Component {
      render() {
        return (
          <View>
            <MapView
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
          </View>
      )}
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: width,
    height: height,
    borderWidth: 1,
  }
});


module.exports = MapScene;
