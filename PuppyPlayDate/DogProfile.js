import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  Image,
  TouchableHighlight
} from 'react-native';

import UserDogs from './UserDogs';

var REQUEST_URL = 'http://localhost:3000/dogs/';

class DogProfile extends Component {
  constructor(props) {
    super(props);
    console.log("Constructing DogProfile");
    console.log("this.props.dog_id is " + this.props.dog_id);

    this.state = {
      dog: {},
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    console.log("fetchData (DogProfile) called for dog_id " + this.props.dog_id);
    fetch(REQUEST_URL + this.props.dog_id)
      .then((response) => response.json())
      .then((responseData) => {
        console.log("fetchData for DogProfile: " + responseData);

        this.setState({
          dog: responseData,
          loaded: true,
        });
      })
      .done();
  }

  goBack() {
    this.props.navigator.pop();
  }

  render() {
    var dog = this.state.dog;
    return (
      <View>
        <View style={styles.navbar}>
          <TouchableHighlight style={styles.backButton} onPress={() => this.goBack()}>
            <Text>Back</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.container}>
          <Image style={styles.dogImage} source={{ uri: dog.avatar }} />
          <Text>Owner:  {dog.owner_id}</Text>
          <Text>Breed:  {dog.breed}</Text>
          <Text>Age:  {dog.age}</Text>
          <Text>Favorite Toy:  {dog.toy}</Text>
          <Text>PlayDates: N/A</Text>
          <Text>Gender:  {dog.gender}</Text>
          <Text>Description: </Text>
          <Text style={styles.dogDescription}>
             {dog.description}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
  },
  dogImage: {
    width: 128,
    height: 128,
    borderRadius: 128/2,
  },
  dogDescription: {
    height: 50,
  },
  backButton: {
    borderWidth: 1,
    padding: 10,
    alignSelf: 'flex-start'
  },
  backButtonText: {
    fontSize: 14,
    borderRadius: 12,
    fontWeight: 'bold',
  },
  navbar: {
    marginTop: 20,
    backgroundColor: 'skyblue',
    marginBottom: 6,
  },
});

module.exports = DogProfile;
