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
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

const styles = require('./style.js')
const REQUEST_URL ='http://localhost:3000/session/login'


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      userID: false
    };
  }
  render() {
    return (
    <Image source={require('./Resources/0.jpg')} style={styles.bImage}>
      <View style={styles.topMargin}></View>
        <View style={styles.container}>
          <View style={styles.outterMargin}>
          </View>
            <View style={styles.content}>
        <Text style={styles.text}>
          Login
        </Text>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={this.state.username}
          onChangeText={(text) => this.setState({username: text})}
        />
        {
          //secureTextEntry={true} add this line on production
      }
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(text) => this.setState({password: text})}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.loginPress.bind(this)}>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableHighlight>

        </View>
      <View style={styles.outterMargin}>
    </View>
  </View>
  </Image>

    );
  }
  loginPress(){
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
        if (responseData.success != false){
          this.makeSession(responseData)
        } else {
          //TODO alert
        }
      })
      .done();
    console.log(this.state.username);
  }

  makeSession(userID){
    AsyncStorage.setItem("userID", String(userID));
    this.props.navigator.popToTop();
      // AsyncStorage.getItem("userID").then((value) => {
      //         this.setState({"userID": value});
      // }).done();
  }
}


module.exports = Login;
