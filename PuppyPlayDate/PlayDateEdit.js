import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  NavigatorIOS,
  Image,
  TouchableHighlight,
  TextInput,
} from 'react-native';

const styles = require('./style.js');

// URL to get a specific playdate if you append an id
var REQUEST_URL = 'http://localhost:3000/playdates/';

class PlayDateEdit extends Component {

  constructor(props) {
    super(props);

    // Initialize Playdate Attributes
    this.state = {
      name: "",
      location: "",
      address: "",
      timeDay: "",
      description: "",
      loaded: false,
    };
  }

  componentDidMount() {
    // As soon as the component is mounted, go and fetch the data for the playdate
    this.fetchData();
  }

  // Performs an Ajax call to retrieve information about the playdate
  fetchData(){
    console.log("fetchData: PlayDateEdit: playdate_id " + this.props.playdate_id)
    fetch(REQUEST_URL + this.props.playdate_id)
      .then((response) => response.json())
      .then((responseData) => {
        // Update the state with the information about the playdate
        this.setState({
          name: responseData.name,
          location: responseData.location,
          address: responseData.address,
          timeDay: responseData.time_day,
          description: responseData.description,
          loaded: true,
        });
      })
      .done();
  }

  onPressEdit() {
    // TODO: perform an update request to update the
    // playdate information in the backend

    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>

          <TextInput
            placeholder="Playdate Name"
            style={styles.inputText}
            value={this.state.name}
            onChangeText={(text) => this.setState({name: text})}
          />

          <TextInput
            style={styles.inputText}
            placeholder="Address"
            value={this.state.address}
            onChangeText={(text) => this.setState({location: text})} />

          <TextInput
            placeholder="Date and Time"
            style={styles.inputText}
            value={this.state.timeDay}
            onChangeText={(text) => this.setState({timeDay: text})} />

          <TextInput
            placeholder="Description"
            style={[styles.inputText, styles.textArea]}
            value={this.state.description}
            onChangeText={(text) => this.setState({description: text})}
            multiline={true}
          />

          <TouchableHighlight
            style={styles.submitButton}
            onPress={this.onPressEdit.bind(this)}
            underlayColor='#99d9f4'
          >
            <Text style={styles.buttonText}>Update</Text>
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
//   inputLabel: {
//     fontWeight: 'bold',
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
//
// });

module.exports = PlayDateEdit;
