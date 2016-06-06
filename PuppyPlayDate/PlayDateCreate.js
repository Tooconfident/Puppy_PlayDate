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
        <TextInput
          style={styles.inputText}
          placeholder="Name"
          value={playdate.name}
          onChange={this.onInputChangeName.bind(this)}
        />
        <TextInput
          style={styles.inputText}
          placeholder="Location"
          value={playdate.location}
          onChange={this.onInputChangeLocation.bind(this)}
        />
        <TextInput
          style={styles.inputText}
          placeholder="Time & Day of the Week"
          value={playdate.time_day}
          onChange={this.onInputChangeTimeDay.bind(this)}
        />
        <TextInput
          style={[styles.inputText, styles.textArea]}
          placeholder="Description"
          multiline={true}
          onChange={this.onInputChangeDescription.bind(this)}
          value={playdate.description}
        />
        <Picker
          selectedValue={playdate.frequency}>
          <Picker.Item label="daily" value="daily" />
          <Picker.Item label="weekly" value="weekly" />
          <Picker.Item label="monthly" value="monthly" />
        </Picker>
        <View>
          <Text>Debugger:</Text>
          <Text>
            {playdate.name}
            {playdate.location}
            {playdate.description}
            {playdate.time_day}
            {playdate.frequency}

          </Text>
        </View>

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
});

module.exports = PlayDateCreate;
