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
  ScrollView,
} from 'react-native';

const styles = require('./style.js');

// URL to get a specific dog if you append an id
var REQUEST_URL = 'http://localhost:3000/dogs/';

class DogEdit extends Component {
  constructor(props) {
    super(props);

    // Initialize Dog Attributes
    this.state = {
      name: "",
      breed: "",
      age: 0,
      toy: "",
      gender: "",
      description: "",
      avatar: "./Resources/dog_avatar.png",
      loaded: false,
    };
  }

  componentDidMount() {
    // As soon as the component is mounted, go and fetch the data for the dog
    this.fetchData();
  }

  // Performs an Ajax call to retrieve information about the dog
  fetchData(){
    console.log("fetchData: DogEdit: dog_id " + this.props.dog_id)
    fetch(REQUEST_URL + this.props.dog_id)
      .then((response) => response.json())
      .then((responseData) => {
        // Update the state with the information about the dog
        this.setState({
          name: responseData.name,
          breed: responseData.breed,
          age: responseData.age,
          toy: responseData.toy,
          gender: responseData.gender,
          description: responseData.description,
          avatar: responseData.avatar,
          loaded: true,
        });
      })
      .done();
  }

  onPressEdit() {
    // TODO: perform an update request to update the
    // dog information in the backend

    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ScrollView>

            <TouchableHighlight>
              <Image source={{uri: this.state.avatar}} style={styles.profileAvatar}/>
            </TouchableHighlight>

            <TextInput
              placeholder="Dog Name"
              style={styles.inputText}
              value={this.state.name}
              onChangeText={(text) => this.setState({name: text})}
            />

            <TextInput
              placeholder="Breed"
              style={styles.inputText}
              value={this.state.breed}
              onChangeText={(text) => this.setState({breed: text})}
            />

            <TextInput
              placeholder="Age"
              style={styles.inputText}
              value={this.state.age.toString()}
              onChangeText={(text) => this.setState({age: text})}
            />

            <TextInput
              placeholder="Favorite Toy"
              style={styles.inputText}
              value={this.state.toy}
              onChangeText={(text) => this.setState({toy: text})}
            />

            <TextInput
              placeholder="Description"
              style={[styles.inputText, styles.textArea]}
              value={this.state.description}
              onChangeText={(text) => this.setState({description: text})}
              multiline={true}
            />

            <TouchableHighlight
              style={styles.submitButton}
              onPress={this.onPressEdit.bind(this)}
            >
              <Text style={styles.buttonText}>
                Update
              </Text>
            </TouchableHighlight>
          </ScrollView>
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
//   bigText: {
//     fontSize: 60,
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
//   input: {
//     height: 40,
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
//   image: {
//     height: 100,
//     width: 100,
//   }
// });

module.exports = DogEdit;
