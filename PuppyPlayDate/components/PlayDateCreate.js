import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  ListView,
  NavigatorIOS,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import PlayDates from './PlayDates';
import MainScene from './MainScene';
import MapScene from './MapScene';
import UserDogs from './UserDogs';

const styles = require('./style.js')

class PlayDateCreate extends Component {
  constructor(props) {
    super(props);
    this.state={
      name: '',
      address: '',
      time_day: '',
      description: '',
      userID: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("userID").then((value) => {
      console.log('current.val '+ value);
        this.setState({userID: value});
    }).done();
  }

  getMarkerLatlng(address) {
    address = address.toLowerCase().trim();
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyA-ZuNXFqKCOUj3Lmkv25H5AyBn-GO6-OY"
    return fetch(url).then((res) => res.json());
    // when using this method chain with this code to get the laglng in an object
    // then((res) => console.log(res.results[0].geometry.location))
  }

  persistPlayDate(res) {
    var coordsJSONStringified = JSON.stringify(res.results[0].geometry.location);
    coordsJSONStringified = coordsJSONStringified.replace('"lat"', '"latitude"');
    coordsJSONStringified = coordsJSONStringified.replace('"lng"', '"longitude"');

    let data = {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        time_day: this.state.time_day,
        address: this.state.address,
        location: coordsJSONStringified,
        description: this.state.description,
        user_id: this.state.userID,
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json'
      }
    }

    fetch('http://localhost:3000/playdates', data)
      .then((response) => response.json())  // promise
      .then((responseData) => {
        console.log(responseData);
        // Goes back to the map scene
        // this.props.navigator.popN(2);

        // Goes back to PlayDate list.
        this.props.navigator.pop({
          title: 'Your Playdates',
          component: PlayDates,
          leftButtonTitle: ' ',
          loaded: false,
        });
      })
      .catch((error) => console.log("An error occurred! " + error))
      .done();
  }

  createGroupPressed() {

    this.getMarkerLatlng(this.state.address)
      .then((res) => { this.persistPlayDate(res); })
      .catch((error) => console.log("An error occured! " + error))
      .done();

    // Hardcode a random location in San Francisco
    // var loc = "{\"latitude\": " + (Math.random()*(37.8-37.71)+37.71).toString() + ", \"longitude\": " + ((Math.random()*(122.48-122.39)+122.39)* -1).toString() + "}";
    // console.log('loc:');
    // console.log(loc);
    //
    // let data = {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     name: this.state.name,
    //     time_day: this.state.time_day,
    //     address: this.state.address,
    //     // location: locResults.results[0].geometry.location,
    //     location: loc,
    //     description: this.state.description,
    //     user_id: this.state.userID
    //   }),
    //   headers: {
    //     'Accept':       'application/json',
    //     'Content-Type': 'application/json'
    //   }
    // }
    //
    // fetch('http://localhost:3000/playdates', data)
    //   .then((response) => response.json())  // promise
    //   .then((responseData) => {
    //     console.log(responseData)
    //     // Goes back to the map scene
    //     this.props.navigator.popN(2);
    //   })
    //   .catch((error) => console.log("An error occurred! " + error))
    //   .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>

          <Text style={[styles.pageHeading, {color: 'black'}]}>
            Create your new Playdate
          </Text>

          <TextInput
            style={styles.inputText}
            value={this.state.name}
            placeholder="Playdate Name"
            onChangeText={(text) => this.setState({name: text})}
          />

          <TextInput
            style={styles.inputText}
            value={this.state.address}
            placeholder="Address"
            onChangeText={(text) => this.setState({address: text})}
          />

          <TextInput
            style={styles.inputText}
            value={this.state.time_day}
            placeholder="Time & Day of Week"
            onChangeText={(text) => this.setState({time_day: text})}
          />

          <TextInput
            style={[styles.inputText, styles.textArea]}
            value={this.state.description}
            multiline={true}
            placeholder="Description"
            onChangeText={(text) => this.setState({description: text})}
          />

          <TouchableHighlight
            style={styles.submitButton}
            onPress={() => this.createGroupPressed()}>
            <Text style={styles.buttonText}>Create Playdate</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 14,
//   },
//   button: {
//     borderWidth: 2,
//     borderRadius: 12,
//     padding: 10,
//     backgroundColor: 'antiquewhite'
//   },
//   inputText: {
//     height: 30,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 16,
//     padding: 10,
//     backgroundColor: '#EBFAFF',
//     marginBottom: 10,
//   },
//   textArea: {
//     height: 100,
//   },
//   label: {
//     fontSize: 14,
//   }
// });

export default PlayDateCreate;
