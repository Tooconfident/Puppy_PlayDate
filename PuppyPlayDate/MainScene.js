import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

import UserDogs from './UserDogs';
import TestPage from './TestPage';
import UserSignup from './UserSignup';
import Login from './Login';
import DogCreate from './DogCreate';
import WelcomePage from './WelcomePage';
import UserEdit from './UserEdit'
import MapScene from './MapScene'

const styles = require('./style.js')

class MainScene extends Component {
  onPressDogs() {
    console.log("onPressDogs");
    var property = "";

    this.props.navigator.push({
      title: 'Dogs',
      component: UserDogs,
      passProps: {property: property},
    });
  }

  onPressTestPage() {
    this.props.navigator.push({
      component: TestPage,
    });
  }

  onPressUserSignup() {
    this.props.navigator.push({
      component: UserSignup,
    });
  }

  onPressLogin() {
    this.props.navigator.push({
      component: Login,
    });
  }

  onPressDogCreate() {
    this.props.navigator.push({
      component: DogCreate,
    });
  }

  onPressWelcomePage() {
    this.props.navigator.push({
      component: WelcomePage,
    });
  }

  onPressMapScene() {
    this.props.navigator.push({
      component: MapScene,
    });
  }

  render(){
    return(
      <Image source={require('./Resources/0.jpg')} style={styles.bImage}>

          <View style={styles.topMargin}></View>
            <View style={styles.container}>
              <View style={styles.outterMargin}>
              </View>
                <View style={styles.content}>


                <Text>Hola a todos!</Text>
                <TouchableHighlight
                  style={styles.button}
                  onPress={this.onPressDogs.bind(this)}>

                  <Text style={styles.buttonText}>
                    Dogs
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.button}
                  onPress={this.onPressTestPage.bind(this)}>
                  <Text style={styles.buttonText}>
                    Test Page
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.button}
                  onPress={this.onPressUserSignup.bind(this)}>
                  <Text style={styles.buttonText}>
                    Sign Up
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.button}
                  onPress={this.onPressLogin.bind(this)}>
                  <Text style={styles.buttonText}>
                    Login
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.button}
                  onPress={this.onPressDogCreate.bind(this)}>
                  <Text style={styles.buttonText}>
                    Create a Dog
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.button}
                  onPress={this.onPressWelcomePage.bind(this)}>
                  <Text style={styles.buttonText}>
                    Welcome Page
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.button}
                  onPress={this.onPressMapScene.bind(this)}>
                  <Text style={styles.buttonText}>
                    Map
                  </Text>
                </TouchableHighlight>
                </View>
              <View style={styles.outterMargin}>
            </View>
          </View>
      </Image>





    );
  }
}



module.exports = MainScene;
