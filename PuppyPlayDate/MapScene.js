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

var REQUEST_URL = 'http://localhost:3000/playdates';

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
      playdates: [],
      loaded: false,
    };
  }

  fetchData(){
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        playdates: responseData,
        loaded: true,
      })
    })
    .done();
  }

  componentDidMount(){
    this.fetchData();
  }

  show() {
    this.refs.m1.showCallout();
  }

  hide() {
    this.refs.m1.hideCallout();
  }

  renderLoadingView() {
   return (
     <View>
       <Text>
         Loading PlayDates...
       </Text>
     </View>
   );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    var region = this.state.region;
    var playdates = this.state.playdates;

    return (
      <View>
        <MapView
          style={styles.map}
          initialRegion={region}
          showsUserLocation= {true}
          followsUserLocation= {false}
          showsPointsOfInterest= {false}
          // onPlayDatePress= show event // callback function
          // onPlayDateSelect= go to group page // these two may have to be flipped
          >
          {this.state.playdates.map(playdate => (
            <MapView.Marker
            coordinate={JSON.parse(playdate.location).coordinate}
            title={playdate.name}
            description={playdate.description}
            />
          ))}
        </MapView>
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
