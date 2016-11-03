import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  AlertIOS
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import PlayDateShow from "./PlayDateShow";
import { fetchPlaydate } from '../actions/index';

const styles = require('../style');

// URL to get a specific playdate if you append an id
const REQUEST_URL = 'http://localhost:3000/playdates/';

class PlayDateEdit extends Component {

  constructor(props) {
    super(props);

    // Initialize Playdate Attributes
    this.state = {
      id: "",
      name: "",
      location: "",
      address: "",
      time_day: "",
      description: "",
      loaded: false,
    };
  }

  componentDidMount() {
    // As soon as the component is mounted, go and fetch the data for the playdate
    this.fetchData();
  }

  // Performs an Ajax call to retrieve information about the playdate
  fetchData() {
    console.log("fetchData: PlayDateEdit: playdate_id", this.props.playdate_id);
    // fetch(REQUEST_URL + this.props.playdate_id)
    //   .then((response) => response.json())
    //   .then((responseData) => {
    //     // Update the state with the information about the playdate
    //     this.setState({
    //       id: responseData.id,
    //       name: responseData.name,
    //       location: responseData.location,
    //       address: responseData.address,
    //       time_day: responseData.time_day,
    //       description: responseData.description,
    //       loaded: true,
    //     });
    //   })
    //   .done();

    this.props.fetchPlaydate(this.props.playdate_id)
      .then(() => {
        const responseData = this.props.playdate;

        this.setState({
          id: responseData.id,
          name: responseData.name,
          location: responseData.location,
          address: responseData.address,
          time_day: responseData.time_day,
          description: responseData.description,
          loaded: true,
        });
      });

  }

  onPressEdit() {
    // TODO: perform an update request to update the
    // playdate information in the backend
    fetch(REQUEST_URL + this.state.id, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        location: this.state.location,
        address: this.state.address,
        time_day: this.state.time_day,
        description: this.state.description,
      })
    })
    .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if (responseData.success !== false) {
          // this.props.navigator.replacePreviousAndPop({
          //   component: DogProfile,
          //   passProps: {
          //     dog_id: this.state.id,
          //   },
          // });
          // this.props.navigator.pop({
          //   component: PlayDateShow,
          //   passProps: {
          //     loaded: false,
          //   },
          // });
          Actions.pop({ loaded: false });
        } else {
          AlertIOS.alert(
           'Something went wrong!'
          );
        }
      })
      .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>

          <TextInput
            placeholder="Playdate Name"
            style={styles.inputText}
            value={this.state.name}
            onChangeText={(text) => this.setState({ name: text })}
          />

          <TextInput
            style={styles.inputText}
            placeholder="Address"
            value={this.state.address}
            onChangeText={(text) => this.setState({ address: text })}
          />

          <TextInput
            placeholder="Date and Time"
            style={styles.inputText}
            value={this.state.time_day}
            onChangeText={(text) => this.setState({ time_day: text })}
          />

          <TextInput
            placeholder="Description"
            style={[styles.inputText, styles.textArea]}
            value={this.state.description}
            onChangeText={(text) => this.setState({ description: text })}
            multiline
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

function mapStateToProps(state) {
  return { playdate: state.playdates.playdate };
}

export default connect(mapStateToProps, { fetchPlaydate })(PlayDateEdit);
