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



class PlayDateEdit extends Component {

  constructor(props) {
    super(props);

    // Initialize Playdate Attributes
    this.state = {
      name: "",
      location: "",
      timeDay: "",
      description: "",
    };
  }

  onPressEdit() {
    this.props.navigator.pop();
  }

  render() {
    return (
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
          style={styles.inputText}
          value={this.state.description}
          onChangeText={(text) => this.setState({description: text})} />

        <TouchableHighlight
          style={styles.button}
          onPress={this.onPressEdit.bind(this)}
          underlayColor='#99d9f4'
        >
          <Text style={styles.buttonText}>Edit</Text>
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
