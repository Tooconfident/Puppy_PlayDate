import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native';

// To connect react and redux
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
// Action creator
import { fetchDog } from '../actions/index';

import ProfileAvatar from './ProfileAvatar';

const styles = require('../style');

class DogProfile extends Component {
  constructor(props) {
    super(props);
    console.log("Constructing DogProfile");
    console.log("this.props.dog_id is", this.props.dog_id);
    console.log("this.props.navigator is", this.props.navigator);
  }

  componentWillMount() {
    // Call upon the action creator to send an action
    // & ultimately retrieve data for the dog
    this.props.fetchDog(this.props.dog_id);
  }

  componentWillReceiveProps() {
    console.log("DogProfile WillReceiveProps");
    // if (!this.props.loaded) {
    //    this.fetchData();
    //  }
  }

  componentWillUpdate() {
    console.log("DogProfile WillUpdate");
    // if (!this.state.loaded) {
    //   this.fetchData();
    // }
  }

  onListPlaydatesPress() {
    console.log("List Playdates");
    // this.props.navigator.push({
    //   title: 'My Playdates',
    //   component: DogPlayDates,
    //   // Make sure to pass the playdate_id to the Edit component
    //   // Note the value has to be an object of key-value properties!
    //   passProps: {
    //     dog_id: this.props.dog_id
    //   }
    // });

  }

  onEditPress() {
    Actions.dogEdit({ dog_id: this.props.dog_id });
  }

  goBack() {
    this.props.navigator.pop();
  }

  render() {
    const { dog } = this.props;

    if (!dog) {
      return <View style={styles.innerContainer}><Text>Loading</Text></View>;
    }

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>

          <ScrollView>
            <View style={{ alignSelf: 'center' }}>
              <ProfileAvatar source={{ uri: dog.avatar }} />
              <Text style={[{ alignSelf: 'center' }, styles.entryLabel]}>{dog.name}</Text>
              <TouchableHighlight onPress={() => this.onListPlaydatesPress()}>
                <Text style={{ alignSelf: 'center' }}>My Playdates</Text>
              </TouchableHighlight>
            </View>

            <View style={[{ borderRadius: 9 }, styles.dogList]}>
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

              <TouchableHighlight onPress={() => this.onEditPress()}>
                <Text style={{ alignSelf: 'flex-end', color: '' }}>Edit</Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { dog: state.dogs.dog };
}

export default connect(mapStateToProps, { fetchDog })(DogProfile);
