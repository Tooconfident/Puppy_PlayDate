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
  AlertIOS
} from 'react-native';

import MapScene from './MapScene'
import MainScene from './MainScene';
import UserSignup from './UserSignup';

const styles = require('./style.js')

const REQUEST_URL ='http://localhost:3000/session/login'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      userID: 0,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("userID").then((value) => {
      console.log('current.val '+ value);
        this.setState({userID: value});
    }).done();
  }

  loginPress() {
    fetch(REQUEST_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)
        if (responseData.success != false) {
          //Login successfully
          this.makeSession(responseData);

          // Redirect to Home scene
          this.props.navigator.push({
            title: 'Puppy Playdate',
            component: MapScene,
            leftButtonTitle: ' ',
            id: 'mapscene',
          })

          // Makes sure to clean up the form after logging in
          this.setState({
            //username: '',
            password: '',
          });

        } else {
          AlertIOS.alert(
           'Something went wrong!'
          );
        }
      })
      .done();
    console.log(this.state.username);
  }

  onPressSignup() {
    this.props.navigator.push({
      title: 'Sign Up',
      component: UserSignup,
    });
  }

  makeSession(userID) {
    console.log('state'+ this.state.userID);
    AsyncStorage.setItem("userID", String(userID));
    console.log('new-state'+ this.state.userID);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./Resources/0.jpg')} style={styles.bImage}>
          <View style={styles.innerContainer}>

            <View style={styles.mainContent}>
            
              <Text style={styles.pageHeading}>
                Your dog also needs to have fun!
              </Text>

              <TextInput
                placeholder="Username"
                style={styles.inputText}
                value={this.state.username}
                onChangeText={(text) => this.setState({username: text})}
                autoCapitalize={'none'}
                autoCorrect={false}
              />

              <TextInput
                placeholder="Password"
                style={styles.inputText}
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(text) => this.setState({password: text})}
                autoCapitalize={'none'}
                autoCorrect={false}
              />
              <TouchableHighlight
                style={styles.submitButton}
                onPress={this.loginPress.bind(this)}>
                <Text style={styles.buttonText}>
                  Login
                </Text>
              </TouchableHighlight>
            </View>

            <View style={styles.pageFooter}>
              <TouchableHighlight
                style={[styles.submitButton, styles.signupButton]}
                onPress={this.onPressSignup.bind(this)}>
                <Text style={styles.buttonText}>
                  Sign Up
                </Text>
              </TouchableHighlight>
            </View>

          </View>
        </Image>
      </View>
    );
  }
}

module.exports = Login;
