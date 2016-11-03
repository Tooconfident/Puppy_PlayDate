import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Picker,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchDog, updateDog, updateEditDogForm } from '../actions/index';

import DogProfile from './DogProfile';

const styles = require('../style');

class DogEdit extends Component {
  constructor(props) {
    super(props);

    // Initialize Dog Attributes
    this.state = {
      id: "",
      loaded: false,
    };
  }

  componentWillMount() {
    // As soon as the component is mounted, go and fetch the data for the dog
    this.fetchData();
  }

  // Performs an Ajax call to retrieve information about the dog
  fetchData() {
    this.props.fetchDog(this.props.dog_id)
      .then(() => {
        //console.log("response", response);

        // dog information is injected as props from application state (redux)
        const responseData = this.props.dog;

        // Update the state with the information about the dog
        this.setState({
          id: responseData.id,
          loaded: true,
        });
        // Update the form fields
        this.props.updateEditDogForm(this.props.dog);
      });
  }

  onPressEdit() {
    const { name, breed, age, toy, description, gender } = this.props;

    const updatedDog = {
      name,
      breed,
      age,
      toy,
      description,
      gender,
    };

    this.props.updateDog(this.props.dog.id, updatedDog)
      .then(() => {
        console.log("Dog updated.");
        // this.props.navigator.pop({
        //   component: DogProfile,
        //   passProps: {
        //     loaded: false,
        //   }
        // });
        //Actions.dogProfile({ loaded: false });
        //Actions.pop({ loaded: false });
        Actions.refresh();
        Actions.pop();
      });

      console.log("Dog updated 2. ");
  }

  render() {
    const { name, breed, age, toy, description, updateEditDogForm } = this.props;
    //const { dog } = this.props;

    // if (!dog) {
    //   return <View><Text>Loading . . .</Text></View>;
    // }

    // For the dog age picker
    const ageRange = [];
    for (let i = 1; i <= 35; i++) {
      ageRange.push(i.toString());
    }

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ScrollView>

            <TouchableHighlight>
              <Image source={{ uri: this.state.avatar }} style={styles.profileAvatar} />
            </TouchableHighlight>

            <TextInput
              placeholder="Dog Name"
              style={styles.inputText}
              value={name}
              onChangeText={name => updateEditDogForm({ name })}
            />

            <TextInput
              placeholder="Breed"
              style={styles.inputText}
              value={breed}
              onChangeText={breed => updateEditDogForm({ breed })}
            />

            <TextInput
              placeholder="Age"
              style={styles.inputText}
              value={age.toString()}
              onChangeText={age => updateEditDogForm({ age })}
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
              value={toy}
              onChangeText={toy => updateEditDogForm({ toy })}
            />

            <TextInput
              placeholder="Description"
              style={[styles.inputText, styles.textArea]}
              value={description}
              onChangeText={description => updateEditDogForm({ description })}
              multiline
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

function mapStateToProps(state) {
  return { dog: state.dogs.dog, ...state.dogEditForm };
}

export default connect(mapStateToProps, { fetchDog, updateDog, updateEditDogForm })(DogEdit);
