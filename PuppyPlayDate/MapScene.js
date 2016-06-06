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
      <View>
        <MapView
          style={styles.map}
          initialRegion={region}
          showsUserLocation= {true}
          followsUserLocation= {false}
          showsPointsOfInterest= {false}
          // onMarkerPress= show event // callback function
          // onMarkSelect= go to group page // these two may have to be flipped
          >
          <MapView.Marker
            ref="m1"
            coordinate={markers[0].coordinate}
            title="PlayDate Title"
            description="Brief Description"
            pinColor=""
          />
          <MapView.Marker ref="m2" coordinate={markers[1].coordinate}>
            <MapView.Callout>
              <View>
                <Text>This is a plain view</Text>
              </View>
            </MapView.Callout>
          </MapView.Marker>
          <MapView.Marker
            ref="m3"
            coordinate={markers[2].coordinate}
            calloutOffset={{ x: -8, y: 28 }}
            calloutAnchor={{ x: 0.5, y: 0.4 }}
          >
            <MapView.Callout tooltip>
              <Text style={{ color: '#fff', backgroundColor: 'black' }}>This is a custom callout bubble view</Text>
            </MapView.Callout>
          </MapView.Marker>
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.show} style={[styles.bubble, styles.button]}>
            <Text>Show</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.hide} style={[styles.bubble, styles.button]}>
            <Text>Hide</Text>
          </TouchableOpacity>
        </View>
      </View>
  )};
  onRegionChangeComplete(region) {
    console.log(region);
  }
};

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    width: width,
    height: height,
    borderWidth: 1,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 60,
    backgroundColor: 'transparent',
  },
});


module.exports = MapScene;
