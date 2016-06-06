import React, { Component } from 'react';
import {
  PropTypes,
  StyleSheet,
  Text,
  View,
  Navigator,
  AlertIOS,
  LinkingIOS,
  TabBarIOS,
  Dimensions,
  Image,
  TouchableHighlight,
  Animated,
  TouchableOpacity,
} from 'react-native';

import MapView from 'react-native-maps';

var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;
const SPACE = 0.01;

class MapScene extends Component {
  constructor(props) {
   super(props);
   this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [
        {
          coordinate: {
            latitude: LATITUDE + SPACE,
            longitude: LONGITUDE + SPACE,
          },
          color: '#FFFFFF',
        },
        {
          coordinate: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
          },
        },
        {
          coordinate: {
            latitude: LATITUDE + SPACE,
            longitude: LONGITUDE - SPACE,
          },
        },
      ],
    };
  }

  show() {
    this.refs.m1.showCallout();
  }

  hide() {
    this.refs.m1.hideCallout();
  }

  render() {
    const { region, markers } = this.state;
    return (
      <MapView
        style={styles.map}
        initialRegion={region}
      >
      <MapView.Marker
          ref="m1"
          coordinate={markers[0].coordinate}
          title="This is a title"
          description="This is a description"
          image={require('./Common/small-icon.png')}
          anchor={{ x: 0.84, y: 1 }}
        />
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
