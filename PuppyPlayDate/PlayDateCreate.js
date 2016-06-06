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
  Picker,
} from 'react-native';

import PlayDates from './PlayDates';
import MainScene from './MainScene';
import UserDogs from './UserDogs';

class PlayDateCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      playdate: {
        name: "",
        location: "",
        time_day: "",
        description: "",
        frequency: "",
      },
    }
  }

  createGroupPressed() {
    console.log('createGroupPressed');
    let data = {
      method: 'POST',
      body: JSON.stringify({
        name: "Bucks Test Playdate", time_day: "Wed 4PM", location: "Aqui tengo tu playdate", user_id: "100"
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json'
      }
    }
    fetch('http://localhost:3000/playdates', data)
        .then((response) => response.json())  // promise
        .then((responseData) => console.log(responseData))
        .catch((error) => console.log("boo"));
    this.props.navigator.pop();
  }

  componentDidMount() {
    console.log("PlayDateCreate: componentDidMount: " + this.props);
  }

  onInputChangeName(event) {
    this.setState({
      playdate: { name: event.nativeEvent.name },
    });
  }

  onInputChangeLocation(event) {
    this.setState({
      playdate: { location: event.nativeEvent.location },
    });
  }

  onInputChangeTimeDay(event) {
    // this.setState({
    //   playdate: { time_day: event.nativeEvent.time_day },
    // });
    this.state.playdate.time_day = event.nativeEvent.time_day;
  }

  onInputChangeDescription(event) {
    this.setState({
      text: event.nativeEvent.description,
      height: event.nativeEvent.contentSize.height,
      //playdate: { description: event.nativeEvent.description },
    });
    this.state.playdate.description = event.nativeEvent.description;
  }

  render() {
    var playdate = this.state.playdate;

    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>
          Create your new PlayDate
        </Text>

        <Text style={styles.label}>Group Name:</Text>
        <TextInput
          style={styles.inputText}
          value={this.state.name}
          onChangeText={(text) => this.setState({name: text})}
        />

        <Text style={styles.label}>Location:</Text>
        <TextInput
          style={styles.inputText}
          value={this.state.location}
          onChangeText={(text) => this.setState({location: text})}
        />

        <Text style={styles.label}>Time & Day of Week:</Text>
        <TextInput
          style={styles.inputText}
          value={this.state.time_day}
          onChangeText={(text) => this.setState({time_day: text})}
        />

        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.inputText}
          value={this.state.description}
          onChangeText={(text) => this.setState({description: text})}
        />

        <TouchableHighlight
          style={styles.button}
          onPress={() => this.createGroupPressed()}>
          <Text>Create PlayDate</Text>
        </TouchableHighlight>
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
  label: {
    fontSize: 14,
  }
});

module.exports = PlayDateCreate;
