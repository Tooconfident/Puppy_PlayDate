import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

// Action creator
import { fetchPlaydates } from '../actions/index';

import PlaydateMap from './PlaydateMap';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;
const SPACE = 0.01;

class MapScene extends Component {
  constructor(props) {
    super(props);

    console.log("MapScene props:", props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      playdates: [],
      userID: 0,
      loaded: false,
    };
  }

  componentWillMount() {
    AsyncStorage.getItem("userID").then((value) => {
      console.log('current.val', value);
      this.setState({ userID: value });

      this.props.fetchPlaydates();
    }).done();
  }

  componentWillReceiveProps(nextProps) {
    console.log('MapScene: componentWillReceiveProps');
    // if (!this.props.loaded) {
    //   this.fetchData();
    // }
    console.log("Got new props coming in", nextProps);
  }

  show() {
    this.refs.m1.showCallout();
  }

  hide() {
    this.refs.m1.hideCallout();
  }

  onHomePress() {
  }

  onProfilePress() {
    Actions.userProfile({ userID: this.state.userID });
  }

  onPlayDatePress() {
    Actions.userPlaydates({ userID: this.props.userID });
  }

  logout() {
    AsyncStorage.removeItem("userID");
    // this.props.navigator.pop();
    Actions.auth();
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

  onPlaydateMarker(playdateName) {
    Actions.playdateShow({
      userID: this.props.userID,
      playdate_id: String(playdateName.id)
    });
  }

  render() {
    const { playdates } = this.props;

    if (!playdates) {
      return this.renderLoadingView();
    }

    const { region } = this.state;

    return (
      <View style={styles.container}>
        <PlaydateMap
          playdates={playdates}
          region={region}
          onPlaydateMarker={this.onPlaydateMarker.bind(this)}
        />

        <View style={styles.tabBar}>
          <TouchableOpacity
            onPress={this.onHomePress.bind(this)}
            style={[styles.button, styles.bubble]}
          >
            <Image
              style={styles.icon}
              source={require('../Resources/dog-house.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.onProfilePress.bind(this)}
            style={[styles.button, styles.bubble]}
          >
            <Image
              style={styles.icon}
              source={require('../Resources/dog_paw.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.onPlayDatePress.bind(this)}
            style={[styles.button, styles.bubble]}
          >
            <Image
              style={styles.icon}
              source={require('../Resources/bone2.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={this.logout.bind(this)}
            style={[styles.button, styles.bubble]}
          >
          <Image
            style={styles.icon}
            source={require('../Resources/log_out.png')}
          />
          </TouchableOpacity>
        </View>

      </View>
    );
  }

  onRegionChangeComplete(region) {
    console.log(region);
  }
}

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
  bubble: {
    flex: 1,
    // backgroundColor: 'rgba(10,41,41,0.4)',
    backgroundColor: '#42fa2f99',
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    height: height * 0.08,
    width: width * 0.25,
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

function mapStateToProps(state) {
  return { playdates: state.playdates.all };
}

export default connect(mapStateToProps, { fetchPlaydates })(MapScene);
