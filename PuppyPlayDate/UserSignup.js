import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  NavigatorIOS,
  Image,
  TouchableHighlight,
  AsyncStorage,
  AlertIOS,
} from 'react-native';

import MainScene from './MainScene';

// Universal Styles
const styles = require('./style.js')

const REQUEST_URL ='http://localhost:3000/users'

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
    fetch(REQUEST_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    })
    .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)
        if (responseData.success != false){
          this.makeSession(responseData.userID)

        } else {
          AlertIOS.alert(
           'Please fill all fields'
          );
        }
      })
      .done();
    // TODO: connect to backend to create user account
    // you also need to get the user_id back from the backend

    //this.props.navigator.push({
    // this.props.navigator.popToTop({
    //   // where do you get the user_id ????
    //   passProps: { user_id: 1 },
    // });
  }

  makeSession(userID) {
    AsyncStorage.setItem("userID", String(userID));
    this.props.navigator.popToTop();
  }

  render() {
    var user = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>

          <Text style={[styles.pageHeading, {color: 'black'}]}>
            Please enter your user information
          </Text>

          <TextInput
            placeholder="Username"
            style={styles.inputText}
            value={user.username}
            onChangeText={(text) => this.setState({username: text})}
            autoCapitalize={'none'}
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
            autoCapitalize={'none'}
          />

          <TextInput
            placeholder="Password"
            style={styles.inputText}
            value={user.password}
            password={true}
            onChangeText={(text) => this.setState({password: text})}
            autoCapitalize={'none'}
            autoCorrect={false}
          />

          <TouchableHighlight
            style={styles.submitButton}
            onPress={this.onPressSignup.bind(this)}>
            <Text style={styles.buttonText}>
              Sign Up
            </Text>
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
//     fontSize: 40,
//   },
//   buttonText: {
//     fontSize: 18,
//     color: "white",
//     alignSelf: "center",
//   },
//   input: {
//     height: 40,
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
//   pageTitle: {
//     marginTop: 20,
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: 20,
//   },
//   subtitle: {
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
//   navbar: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 20,
//     backgroundColor: 'skyblue',
//     marginBottom: 6,
//   },
// });

export default UserSignup;
