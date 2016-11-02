import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  AsyncStorage,
  Alert
} from 'react-native';

import { connect } from 'react-redux';
import { fetchDog, createDog, updateNewDogForm } from '../actions/index';

const styles = require('../style');

class DogCreate extends Component {

  componentDidMount() {
    AsyncStorage.getItem("userID").then((value) => {
      console.log('current.val', value);
      this.setState({ userID: value });
    }).done();
  }

  onPressCreate() {
    // fetch(REQUEST_URL, {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     name: this.state.name,
    //     age: this.state.age,
    //     breed: this.state.breed,
    //     toy: this.state.toy,
    //     user_id: this.state.userID,
    //
    //   })
    // })
    // .then((response) => response.json())
    //   .then((responseData) => {
    //     console.log(responseData)
    //     if (responseData.success != false){
    //       //Add a Dog
    //       this.props.navigator.popN(2);
    //       // this.props.navigator.replace({
    //       //   title: 'Dog Profile',
    //       //   component: DogProfile,
    //       //   passProps: {
    //       //     dog_id: responseData.id,
    //       //     loaded: false,
    //       //   },
    //       // });
    //     } else {
    //       AlertIOS.alert(
    //        'Something went wrong!'
    //       );
    //     }
    //   })
    //   .done();
    
    // Retrieve form field data from redux application state
    const { name, age, breed, toy } = this.props;

    const newDog = {
      name,
      age,
      breed,
      toy,
      user_id: this.state.userID,
    };

    this.props.createDog(newDog)
      .then(() => {
        Alert.alert(
          'Success',
          'Your dog has been added successfully',
          [
            { text: 'OK', onPress: () => this.props.navigator.pop() }
          ]
        );
        // this.props.navigator.push({
        //   component: DogProfile
        // });
      });
  }

  render() {
    const { name, breed, age, toy, avatar, updateNewDogForm } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>

          <Text style={[styles.pageHeading, { color: 'black' }]}>
            Tell us About your Dog
          </Text>

          <TextInput
            placeholder="Dog Name"
            style={styles.inputText}
            value={name}
            onChangeText={name => updateNewDogForm({ name })}
          />

          <TextInput
            placeholder="Breed"
            style={styles.inputText}
            value={breed}
            onChangeText={breed => updateNewDogForm({ breed })}

          />

          <TextInput
            placeholder="Age"
            style={styles.inputText}
            value={age}
            onChangeText={age => updateNewDogForm({ age })}

          />

          <TextInput
            placeholder="Favorite Toy"
            style={styles.inputText}
            value={toy}
            onChangeText={toy => updateNewDogForm({ toy })}

          />

          <TouchableHighlight
            style={styles.submitButton}
            onPress={() => this.onPressCreate()}
          >
            <Text style={styles.buttonText}>
              Add Dog
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { name, breed, age, toy, avatar } = state.dogNewForm;
  return { name, breed, age, toy, avatar };
}

export default connect(mapStateToProps, { fetchDog, createDog, updateNewDogForm })(DogCreate);
