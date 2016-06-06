import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  Navigator,
  Image,
  TouchableHighlight
} from 'react-native';

import MainScene from './MainScene';

class UserSignup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      name: "",
      email: "",
      password: "",
    };
  }

  onPressSignup() {
    // TODO: connect to backend to create user account
    // you also need to get the user_id back from the backend

    //this.props.navigator.push({
    this.props.navigator.popToTop({
      // where do you get the user_id ????
      passProps: { user_id: 1 },
    });
  }

  render() {
    var user = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>
          Sign Up
        </Text>

        <TextInput
          placeholder="Username"
          style={styles.inputText}
          value={user.username}
          onChangeText={(text) => this.setState({username: text})}
        />

        <TextInput
          placeholder="Name"
          style={styles.inputText}
          value={user.name}
          onChangeText={(text) => this.setState({name: text})}
        />

        <TextInput
          placeholder="Email"
          style={styles.inputText}
          value={user.email}
          onChangeText={(text) => this.setState({email: text})}
        />

        <TextInput
          placeholder="Password"
          style={styles.inputText}
          value={user.password}
          password={true}
          onChangeText={(text) => this.setState({password: text})}
        />

        <TouchableHighlight
          style={styles.button}
          onPress={this.onPressSignup.bind(this)}>
          <Text style={styles.buttonText}>
            Sign Up
          </Text>
        </TouchableHighlight>

        <View>
          <Text>Debug:</Text>
          <Text>{user.name}</Text>
          <Text>{user.password}</Text>
          <Text>{user.email}</Text>
          <Text>{user.username}</Text>
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
    fontSize: 40,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center",
  },
  input: {
    height: 40,
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
  pageTitle: {
    marginTop: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    backgroundColor: 'skyblue',
    marginBottom: 6,
  },
});

module.exports = UserSignup;
