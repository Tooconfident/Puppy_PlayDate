import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchUser } from '../actions/index';

import DogsList from './DogsList';

const styles = require('../style');

class UserDogs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: this.props.userID,
    };
  }

  componentWillMount() {
    AsyncStorage.getItem("userID").then((value) => {
      console.log('userID: current.val', value);
      this.setState({
        userID: value
      });
    })
    .then((value) => {
      console.log("fetchData for UserDogs using " + this.state.userID + " for userID");
      this.props.fetchUser(this.props.userID);
    })
    .done();
  }

  onEditPress() {
    Actions.userEdit({ user_id: this.state.userID });
  }

  onAddPress() {
    Actions.dogNew({ user_id: this.state.userID });
  }

  render() {
    const { user } = this.props;
    //const { dogs } = user;

    // Destructure styles
    const {
      container,
      innerContainer,
      userProfileTop,
      entryLabel,
      editProfileButton,
      editProfileButtonText,
      addButton,
      addButtonText,
    } = styles;

    if (!user) {
      return (<Text>Loading...</Text>);
    }

    return (
      <View style={container}>
        <View style={innerContainer}>

          <View style={userProfileTop}>
            <Text style={entryLabel}>{user.name + "'s Dogs"}</Text>
            <TouchableOpacity
              style={editProfileButton} onPress={() => this.onEditPress()}
            >
              <Text style={editProfileButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <TouchableHighlight
            style={[addButton, { alignSelf: "flex-end" }]}
            onPress={() => this.onAddPress()}
          >
            <Text style={addButtonText} >+ Add Dog</Text>
          </TouchableHighlight>

          <DogsList
            dogs={user.dogs}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.users.user,
    //dogs: state.users.user.dogs
  };
}

export default connect(mapStateToProps, { fetchUser })(UserDogs);
