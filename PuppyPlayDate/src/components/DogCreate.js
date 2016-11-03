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
import { Actions } from 'react-native-router-flux';
import { fetchDog, createDog, updateNewDogForm } from '../actions/index';

const styles = require('../style');

class DogCreate extends Component {

  componentDidMount() {
    AsyncStorage.getItem("userID").then((value) => {
      console.log('current.val', value);
      this.setState({ userID: value });
    }).done();
  }

  onCreatePress() {
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
          //  { text: 'OK', onPress: () => Actions.userProfile() }
            { text: 'OK', onPress: () => { Actions.refresh(); Actions.pop(); } }
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
            onPress={() => this.onCreatePress()}
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
