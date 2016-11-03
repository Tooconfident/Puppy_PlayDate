import React, { Component } from 'react';
import {
  AsyncStorage,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { updateNewPlaydateForm, createPlaydate } from '../actions';

const styles = require('../style');

class PlayDateCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("userID").then((value) => {
      console.log('current.val', value);
      this.setState({ userID: value });
    }).done();
  }

  onSubmit() {
    // Retrieve form info from app state
    const { name, time_day, address, description } = this.props;

    const playdate = {
      name,
      time_day,
      address,
      description,
      user_id: this.state.userID,
    };

    this.props.createPlaydate(playdate)
      .then(() => {
        Actions.pop({
          loaded: false
        });
      });

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
    const { name, address, time_day, description, updateNewPlaydateForm } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>

          <Text style={[styles.pageHeading, { color: 'black' }]}>
            Create your new Playdate
          </Text>

          <TextInput
            style={styles.inputText}
            value={name}
            placeholder="Playdate Name"
            onChangeText={name => updateNewPlaydateForm({ name })}
          />

          <TextInput
            style={styles.inputText}
            value={address}
            placeholder="Address"
            onChangeText={address => updateNewPlaydateForm({ address })}
          />

          <TextInput
            style={styles.inputText}
            value={time_day}
            placeholder="Time & Day of Week"
            onChangeText={time_day => updateNewPlaydateForm({ time_day })}
          />

          <TextInput
            style={[styles.inputText, styles.textArea]}
            value={description}
            multiline
            placeholder="Description"
            onChangeText={description => updateNewPlaydateForm({ description })}
          />

          <TouchableHighlight
            style={styles.submitButton}
            onPress={() => this.onSubmit()}
          >
            <Text style={styles.buttonText}>Create Playdate</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { name, address, time_day, description } = state.playdateNewForm;
  return { name, address, time_day, description };
}

export default connect(mapStateToProps, { updateNewPlaydateForm, createPlaydate })(PlayDateCreate);
