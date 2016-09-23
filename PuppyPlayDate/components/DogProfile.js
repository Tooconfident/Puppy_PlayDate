import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  NavigatorIOS,
  Image,
  TouchableHighlight
} from 'react-native';

import UserDogs from './UserDogs';
import DogEdit from './DogEdit';
import DogPlayDates from './DogPlayDates';

const styles = require('../style.js');

const REQUEST_URL = 'http://localhost:3000/dogs/';

class DogProfile extends Component {
  constructor(props) {
    super(props);
    console.log("Constructing DogProfile");
    console.log("this.props.dog_id is " + this.props.dog_id);
    console.log("this.props.navigator is " + this.props.navigator);

    this.state = {
      dog: {},
      loaded: false,
    };
  }

  componentDidMount() {
    console.log("DogProfile didMount");

    this.fetchData();
  }

  componentWillUpdate() {
    console.log("DogProfile WillUpdate");
    // if (!this.state.loaded) {
    //   this.fetchData();
    // }
  }

  componentWillReceiveProps() {
    console.log("DogProfile WillReceiveProps");
    if (!this.props.loaded) {
       this.fetchData();
     }
  }

  fetchData() {
    console.log("fetchData (DogProfile) called for dog_id " + this.props.dog_id);
    fetch(REQUEST_URL + this.props.dog_id)
      .then((response) => response.json())
      .then((responseData) => {
        console.log("fetchData for DogProfile: " + responseData);
        for (let data in responseData) {
          this.setState({
            [data]:responseData[data]
          });
        }
        this.setState({loaded: true,});
      })
      .done();
  }

  goBack() {
    this.props.navigator.pop();
  }

  onPressListPlaydates() {
    console.log("List Playdates");
    this.props.navigator.push({
      title: 'My Playdates',
      component: DogPlayDates,
      // Make sure to pass the playdate_id to the Edit component
      // Note the value has to be an object of key-value properties!
      passProps: {
        dog_id: this.props.dog_id
      }
    });
  }

  onPressEdit() {
    console.log("onPressEdit");
    this.props.navigator.push({
      title: 'Edit Dog Profile',
      component: DogEdit,
      // Make sure to pass the playdate_id to the Edit component
      // Note the value has to be an object of key-value properties!
      passProps: {
        dog_id: this.props.dog_id
      }
    });
  }

  render() {
    var dog = this.state;
    console.log('DogProfile this.state:');
    console.log(this.state);

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>

          <ScrollView>
            <View style={{alignSelf: 'center'}}>
              <Image style={styles.profileAvatar} source={{ uri: dog.avatar }} />
              <Text style={[{alignSelf: 'center'}, styles.entryLabel]}>{dog.name}</Text>
              <TouchableHighlight onPress={() => this.onPressListPlaydates()}>
                <Text style={{alignSelf: 'center'}}>My Playdates</Text>
              </TouchableHighlight>
            </View>

            <View style={[{borderRadius: 9}, styles.dogList]}>
              <View style={styles.profileEntry}>
                <Text style={styles.entryLabel}>Owner: <Text style={styles.entryText}>{dog.owner_username}</Text></Text>
              </View>

              <View style={styles.profileEntry}>
                <Text style={styles.entryLabel}>Breed: <Text style={styles.entryText}>{dog.breed}</Text></Text>
              </View>

              <View style={styles.profileEntry}>
                <Text style={styles.entryLabel}>Age: <Text style={styles.entryText}>{dog.age}</Text></Text>
              </View>

              <View style={styles.profileEntry}>
                <Text style={styles.entryLabel}>Favorite Toy: <Text style={styles.entryText}>{dog.toy}</Text></Text>
              </View>

              <View style={styles.profileEntry}>
                <Text style={styles.entryLabel}>PlayDates: <Text style={styles.entryText}>N/A</Text></Text>
              </View>

              <View style={styles.profileEntry}>
                <Text style={styles.entryLabel}>Gender: <Text style={styles.entryText}>{dog.gender}</Text></Text>
              </View>

              <View style={styles.profileEntry}>
                <Text style={styles.entryLabel}>Description: <Text style={styles.entryText}>{dog.description}</Text></Text>
              </View>

              <TouchableHighlight onPress={() => this.onPressEdit()}>
                <Text style={{alignSelf: 'flex-end', color: ''}}>Edit</Text>
              </TouchableHighlight>
            </View>
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
//     marginTop: 75,
//   },
//   text: {
//     fontSize: 14,
//   },
//   dogImage: {
//     width: 128,
//     height: 128,
//     borderRadius: 128/2,
//   },
//   dogDescription: {
//     height: 50,
//   },
//   backButton: {
//     borderWidth: 1,
//     padding: 10,
//     alignSelf: 'flex-start'
//   },
//   editButton: {
//     borderWidth: 1,
//     padding: 10,
//     alignSelf: 'flex-end',
//   },
//   backButtonText: {
//     fontSize: 14,
//     borderRadius: 12,
//     fontWeight: 'bold',
//   },
//   navbar: {
//     marginTop: 20,
//     backgroundColor: 'skyblue',
//     marginBottom: 6,
//   },
// });

export default DogProfile;
