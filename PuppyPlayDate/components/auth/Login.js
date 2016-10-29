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
import { connect } from 'react-redux';

import MapScene from '../MapScene';
import MainScene from '../MainScene';
import Register from '../auth/Register';

// Action creators
import {
  loginUser,
  usernameChanged,
  passwordChanged
} from '../../actions/index';

const styles = require('../../style.js');

const REQUEST_URL ='http://localhost:3000/session/login';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: 0,
    };
  }

  componentWillMount() {
    AsyncStorage.getItem("userID").then((value) => {
      console.log('current.val '+ value);
        this.setState({userID: value});
    }).done();
  }

  onUsernameChange(username) {
    this.props.usernameChanged(username);
  }

  onPasswordChange(password) {
    this.props.passwordChanged(password);
  }

  onLoginPress() {
    const { username, password } = this.props;

    this.props.loginUser({
      username,
      password
    })
      .then(() => {
        // Redirect to Home scene
        this.props.navigator.push({
          title: 'Puppy Playdate',
          component: MapScene,
          leftButtonTitle: ' ',
          id: 'mapscene',
        });
      })
      .catch((error) => {
        console.log("Login failed");
        console.log(error);
      });
  }

  onSignupPress() {
    this.props.navigator.push({
      title: 'Sign Up',
      component: Register,
    });
  }

  renderErrorMessage() {
    if (this.props.errorMessage !== '') {
      return (
        <Text style={customStyles.errorText}>
          {this.props.errorMessage}
        </Text>
      );
    }
  }

//Image source={require('../../Resources/0.jpg')} style={styles.bImage}
  render() {
    const { username, password } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <View style={styles.innerContainer}>

            <View style={styles.mainContent}>

              <Text style={styles.pageHeading}>
                Your dog also needs to have fun!
              </Text>

              <TextInput
                placeholder="Username"
                style={styles.inputText}
                value={username}
                onChangeText={this.onUsernameChange.bind(this)}
                autoCapitalize={'none'}
                autoCorrect={false}
              />

              <TextInput
                placeholder="Password"
                style={styles.inputText}
                secureTextEntry={true}
                value={password}
                onChangeText={this.onPasswordChange.bind(this)}
                autoCapitalize={'none'}
                autoCorrect={false}
              />

              {this.renderErrorMessage()}

              <TouchableHighlight
                style={styles.submitButton}
                onPress={this.onLoginPress.bind(this)}>
                <Text style={styles.buttonText}>
                  Login
                </Text>
              </TouchableHighlight>
            </View>

            <View style={styles.pageFooter}>
              <TouchableHighlight
                style={[styles.submitButton, styles.signupButton]}
                onPress={this.onSignupPress.bind(this)}>
                <Text style={styles.buttonText}>
                  Sign Up
                </Text>
              </TouchableHighlight>
            </View>

          </View>
        </View>
      </View>
    );
  }
}

const customStyles = StyleSheet.create({
  errorText: {
    fontSize: 18,
    color: 'red',
    alignSelf: 'center'
  }
});

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    username: state.auth.username,
    password: state.auth.password
  };
}

export default connect(mapStateToProps, { loginUser, usernameChanged, passwordChanged })(Login);
