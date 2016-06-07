import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  ListView,
  Navigator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import PlayDates from './PlayDates';
import MainScene from './MainScene';
import UserDogs from './UserDogs';

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

  createGroupPressed() {
    console.log('createGroupPressed');
    console.log('this.state: ' + this.state);
    let data = {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        time_day: this.state.time_day,
        address: this.state.address,
        description: this.state.description,
        user_id: this.state.userID
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json'
      }
    }
    fetch('http://localhost:3000/playdates', data)
      .then((response) => response.json())  // promise
      .then((responseData) => {
        console.log(responseData)
        this.props.navigator.pop();
      })
      .catch((error) => console.log("boo"))
      .done();
  }



  render() {
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

        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={styles.inputText}
          value={this.state.address}
          onChangeText={(text) => this.setState({address: text})}
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
