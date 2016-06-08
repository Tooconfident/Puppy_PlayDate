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
  TouchableHighlight
} from 'react-native';

import UserDogs from './UserDogs';

const styles = require('./style.js');

// URL to the API to get a specific user if you append an id
var REQUEST_URL = 'http://localhost:3000/users/';

class UserEdit extends Component {
  constructor(props) {
    super(props);

    // Initialize Playdate Attributes
    this.state = {
      username: "",
      name: "",
      email: "",
      password: "",
      loaded: false,
    };
  }

  componentDidMount() {
    // As soon as the component is mounted, go and fetch the data for the user
    this.fetchData();
  }

  // Performs an Ajax call to retrieve information about the user
  fetchData(){
    console.log("fetchData: UserEdit: user_id " + this.props.user_id)
    fetch(REQUEST_URL + this.props.user_id)
      .then((response) => response.json())
      .then((responseData) => {
        // Update the state with the information about the playdate
        this.setState({
          name: responseData.name,
          username: responseData.username,
          email: responseData.email,
          loaded: true,
        });
      })
      .done();
  }

  onPressEdit() {
    // TODO: perform an update request to update the
    // playdate information in the backend

    this.props.navigator.pop();
  }

  render() {
    var user = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>

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
            style={styles.submitButton}
            onPress={this.onPressEdit.bind(this)}
            underlayColor='#99d9f4'
          >
            <Text style={styles.buttonText}>Edit</Text>
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
//   button: {
//     height: 36,
//     backgroundColor: "#48bbec",
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 10,
//     alignSelf: "stretch",
//   },
//   buttonText: {
//     fontSize: 18,
//     color: "white",
//     alignSelf: "center",
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
//   input: {
//     height: 40,
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

module.exports = UserEdit;
