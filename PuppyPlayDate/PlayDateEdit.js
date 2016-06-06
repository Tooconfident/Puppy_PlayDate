import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  Image,
  TouchableHighlight,
  TextInput,
} from 'react-native';

import Navbar from './Navbar'

// URL to get a specific playdate if you append an id
var REQUEST_URL = 'http://localhost:3000/playdates/';

class PlayDateEdit extends Component {

  constructor(props) {
    super(props);

    // Initialize Playdate Attributes
    this.state = {
      name: "",
      location: "",
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
      <View>
        <Navbar navigator={this.props.navigator} title='Edit Playdate'>
          <Text> </Text>
        </Navbar>

        <View style={styles.container}>
          <Text style={styles.inputLabel}>Playdate Name</Text>
          <TextInput
            style={styles.inputText}
            value={this.state.name}
            onChangeText={(text) => this.setState({name: text})} />

          <Text style={styles.inputLabel}>Playdate Location</Text>
          <TextInput
            style={styles.inputText}
            value={this.state.location}
            onChangeText={(text) => this.setState({location: text})} />

          <Text style={styles.inputLabel}>Playdate Date and Time</Text>
          <TextInput
            style={styles.inputText}
            value={this.state.timeDay}
            onChangeText={(text) => this.setState({timeDay: text})} />

          <Text style={styles.inputLabel}>Playdate Description</Text>
          <TextInput
            style={[styles.inputText, styles.textArea]}
            value={this.state.description}
            onChangeText={(text) => this.setState({description: text})}
            multiline={true}
          />

          <TouchableHighlight
            style={styles.button}
            onPress={this.onPressEdit.bind(this)}
            underlayColor='#99d9f4'
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
  },
  button: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 10,
    backgroundColor: 'antiquewhite'
  },
  inputLabel: {
    fontWeight: 'bold',
  },
  inputText: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 16,
    padding: 10,
    backgroundColor: '#EBFAFF',
    marginBottom: 10,
  },
  textArea: {
    height: 100,
  },

});

module.exports = PlayDateEdit;
