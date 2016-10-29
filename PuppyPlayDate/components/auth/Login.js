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
      username: "",
      password: "",
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

  loginPress() {
    // console.log(this.state.username, this.state.password);
    // console.log(this.props.loginUser({username: "hey", password: "123"}));
    // this.props.loginUser({
    //   username: this.state.username,
    //   password: this.state.password
    // })
    //   .then(() => {
    //     //console.log(response);
    //     console.log("YAYYY");
    //
    //     console.log(this);
    //     // Makes sure to clean up the form after logging in
    //     this.setState({
    //       //username: '',
    //       password: '',
    //     });
    //
    //     // Redirect to Home scene
    //     this.props.navigator.push({
    //       title: 'Puppy Playdate',
    //       component: MapScene,
    //       leftButtonTitle: ' ',
    //       id: 'mapscene',
    //     });
    //   })
    //   .catch((error) => {
    //     console.log("Login failed");
    //     console.log(error);
    //   });

    const { username, password } = this.props;

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
          // AlertIOS.alert(
          //  'Something went wrong!'
          // );
        }
      })
      .done();
    console.log(this.state.username);
  }

  onPressSignup() {
    this.props.navigator.push({
      title: 'Sign Up',
      component: Register,
    });
  }

  makeSession(userID) {
    console.log('state'+ this.state.userID);

    console.log('new-state'+ this.state.userID);
  }

  renderErrorMessage() {
    if (this.props.errorMessage !== '') {
      return (
        <Text>
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

              {this.renderErrorMEssage()}

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
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    username: state.auth.username,
    password: state.auth.password
  };
}

export default connect(mapStateToProps, { loginUser, usernameChanged, passwordChanged })(Login);
