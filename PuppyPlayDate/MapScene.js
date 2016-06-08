import React, { Component } from 'react';
import {
  PropTypes,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  AlertIOS,
  LinkingIOS,
  TabBarIOS,
  Dimensions,
  Image,
  TouchableHighlight,
  Animated,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import MapView from 'react-native-maps';
import UserDogs from './UserDogs';
import PlayDates from './PlayDates';

var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;
const SPACE = 0.01;

var REQUEST_URL = 'http://localhost:3000/playdates/show_all';

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

    AsyncStorage.getItem("userID").then((value) => {
      console.log('current.val '+ value);
      this.setState({"userID": value});
    }).done();

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

  onPressHome(){
    console.log('PressHome');
    // this.props.navigator.resetTo ({
    //   title: 'Home Page',
    //   component: MapScene,
    //   passProps: {userData: this.props.userData}
    // })
  }

  onPressProfile(){
    console.log('PressProfile');
    this.props.navigator.push ({
      title: 'Profile',
      component: UserDogs,
      passProps: {userData: this.props.userData, userId: this.props.userId}
    })
  }

  onPressPlayDate(){
    console.log('PressPlayDate');
    this.props.navigator.push ({
      title: 'Playdates',
      component: PlayDates,
      passProps: {userData: this.props.userData, userId: this.props.userId}
    })
  }

  logout() {
    AsyncStorage.clear();
    this.props.navigator.pop();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    var region = this.state.region;
    var playdates = this.state.playdates;

    return (
      <View style={styles.container}>
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

        <View style={styles.tabBar}>
          <TouchableOpacity onPress={this.onPressHome.bind(this)} style={[styles.button, styles.bubble]}>
            <Image
              style={styles.icon}
              source={require('./Resources/dog-house.png')}>
            </Image>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onPressProfile.bind(this)} style={[styles.button, styles.bubble]}>
            <Image
              style={styles.icon}
              source={require('./Resources/dog_paw.png')}>
            </Image>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onPressPlayDate.bind(this)} style={[styles.button, styles.bubble]}>
            <Image
              style={styles.icon}
              source={require('./Resources/bone2.png')}>
            </Image>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={this.logout.bind(this)}
            style={[styles.button, styles.bubble]}
          >
          <Image
            style={styles.icon}
            source={require('./Resources/log_out.png')}>
          </Image>
          </TouchableOpacity>
        </View>

      </View>
  )};

  onRegionChangeComplete(region) {
    console.log(region);
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'blue',
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(10,41,41,0.4)',
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    height: height * .08,
    width: width * .20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    height: 30,
    width: 30,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  tabBar: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // backgroundColor: '#e6f2ff',
    // alignSelf: 'flex-end',
    // marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
});


module.exports = MapScene;
