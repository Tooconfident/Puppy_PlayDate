import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

// Action Creators
import {
  registerUser,
  signupUsernameChanged,
  signupPasswordChanged,
  signupEmailChanged,
  signupNameChanged,
} from '../../actions/index';

// Universal Styles
const styles = require('../../style');

class Register extends Component {
  onSignupPress() {
    const { username, name, email, password } = this.props;

    this.props.registerUser({
      username,
      name,
      email,
      password
    })
      .then(() => {
        Actions.auth();
      });
  }

  renderErrorMessage() {
    if (this.props.error !== '') {
      return (
        <Text style={customStyles.errorText}>
          {this.props.error}
        </Text>
      );
    }
  }

  render() {
    const { username, password, email, name } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>

          <Text style={[styles.pageHeading, { color: 'black' }]}>
            Please enter your user information
          </Text>

          <TextInput
            placeholder="Username"
            style={styles.inputText}
            value={username}
            onChangeText={this.props.signupUsernameChanged.bind(this)}
            autoCapitalize={'none'}
            autoCorrect={false}
          />

          <TextInput
            placeholder="Name"
            style={styles.inputText}
            value={name}
            onChangeText={this.props.signupNameChanged.bind(this)}
          />

          <TextInput
            placeholder="Email"
            style={styles.inputText}
            value={email}
            onChangeText={this.props.signupEmailChanged.bind(this)}
            autoCapitalize={'none'}
          />

          <TextInput
            placeholder="Password"
            style={styles.inputText}
            value={password}
            secureTextEntry
            onChangeText={this.props.signupPasswordChanged.bind(this)}
            autoCapitalize={'none'}
            autoCorrect={false}
          />

          {this.renderErrorMessage()}

          <TouchableHighlight
            style={styles.submitButton}
            onPress={this.onSignupPress.bind(this)}
          >
            <Text style={styles.buttonText}>
              Sign Up
            </Text>
          </TouchableHighlight>
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
  const { email, username, password, name, error } = state.signup;

  return {
    email,
    username,
    password,
    name,
    error
  };
}

export default connect(
  mapStateToProps,
  {
    registerUser,
    signupUsernameChanged,
    signupPasswordChanged,
    signupEmailChanged,
    signupNameChanged,
  }
)(Register);
