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
    this.state = { text: "" }
  }

  createGroupPressed() {
    console.log('createGroupPressed');
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>
          Create your new PlayDate
        </Text>
        <TextInput
          style={styles.inputText}
          placeholder="Name"
        />
        <TextInput
          style={styles.inputText}
          placeholder="Location"
        />
        <TextInput
          style={styles.inputText}
          placeholder="Time & Day of the Week"
        />
        <TextInput
          style={[styles.inputText, styles.textArea]}
          placeholder="Description"
          multiline={true}
          onChange={(event) => {
            this.setState({
              text: event.nativeEvent.text,
              height: event.nativeEvent.contentSize.height,
            });
          }}
          value={this.state.text}
        />
        <Picker>
          <Picker.Item label="daily" value="daily" />
          <Picker.Item label="weekly" value="weekly" />
          <Picker.Item label="monthly" value="monthly" />
        </Picker>
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
