import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  NavigatorIOS,
  Picker,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

import DogProfile from './DogProfile';

const styles = require('./style.js');

// URL to get a specific dog if you append an id
var REQUEST_URL = 'http://localhost:3000/dogs/';

class DogEdit extends Component {
  constructor(props) {
    super(props);

    // Initialize Dog Attributes
    this.state = {
      id: "",
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
          id: responseData.id,
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
    fetch(REQUEST_URL + this.state.id, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        breed: this.state.breed,
        age: this.state.age,
        toy: this.state.toy,
        description: this.state.description,
        gender: responseData.gender,
      })
    })
    .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)
        if (responseData.success != false){
          // this.props.navigator.replacePreviousAndPop({
          //   component: DogProfile,
          //   passProps: {
          //     dog_id: this.state.id,
          //   },
          // });
          this.props.navigator.pop({
            component: DogProfile,
            passProps: {
              loaded: false,
            }
          });
        } else {
          AlertIOS.alert(
           'Something went wrong!'
          );
        }
      })
      .done();
  }

  render() {
    // For the dog age picker
    var ageRange = [];
    for (var i = 1; i <= 35; i++) {
      ageRange.push(i.toString());
    }

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

            {
            // <Text style={[styles.inputLabel, {alignSelf: 'center'}]}>Age </Text>
            //
            // <View style={styles.pickerArea}>
            //
            //   <Picker
            //     selectedValue={this.state.age}
            //     onValueChange={(text) => this.setState({age: text})}
            //   >
            //     {ageRange.map((age) => (
            //       <Picker.Item
            //         label={age}
            //         value={age}
            //       />
            //     ))}
            //   </Picker>
            // </View>
            }

            {
            // <TextInput
            //   placeholder="Gender"
            //   style={styles.inputText}
            //   value={this.state.breed}
            //   onChangeText={(text) => this.setState({gender: text})}
            // />
            }

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
