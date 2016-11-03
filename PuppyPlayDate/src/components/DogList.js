import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight,
  AsyncStorage,
  AlertIOS
} from 'react-native';

import DogProfile from './DogProfile';
import DogCreate from './DogCreate';
import UserEdit from './UserEdit';
import PlayDateShow from './PlayDateShow';

const styles = require('../style');

// URL to the API to get a specific user if you append an id
const REQUEST_URL = 'http://localhost:3000/users/';
const JOIN_URL = 'http://localhost:3000/memberships/join/';

class DogList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      loaded: false,
      userID: this.props.userID,
    };
    // var dataSource = new ListView.DataSource(
    //   {rowHasChanged: (r1, r2) => r1 !== r2}
    // );
    // this.state = {
    //   dataSource: dataSource.cloneWithRows(data)
    // }
  }

  componentDidMount() {
    AsyncStorage.getItem("userID").then((value) => {
      console.log('userID: current.val', value);
      this.setState({
        userID: value
      });
    })
    .then((value) => {
      this.fetchData();
    })
    .done();
  }

  fetchData() {
    console.log("fetchData for UserDogs using " + this.state.userID + "for userID");
    // assume a user_id is passed to this component
    fetch(REQUEST_URL + this.state.userID)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.dogs),
          loaded: true,
        });
      })
      .done();

  }

  onPressDogJoin(id) {
    console.log(this.props.group_id);
    fetch(JOIN_URL + "?dog_id=" + id + "&id=" + this.props.group_id + "", {
      method: "POST",
      hearders: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.props.playdate_id,
        dog_id: id,
      })
    })
    .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
        if (responseData.success) {
          this.props.navigator.popN(2);
        } else {
          AlertIOS.alert(
            "Something went wrong!"
          );
        }
      })
      .done();
  }


  // Entry row
  renderRow(rowData, sectionID, rowID) {
    // console.log("Rendering a row. . .");
    // console.log("rowData.avatar = " + rowData.avatar);

    return (
      <TouchableHighlight onPress={() => this.onPressDogJoin(rowData.id)}>
        <View style={styles.listEntry}>
          <Image style={styles.entryAvatar} source={{ uri: rowData.avatar }} />

          <View style={styles.listEntryContent}>
            <Text style={styles.entryLabel}>
              {rowData.name}
            </Text>

            <Text style={styles.entryLabel}>
              Age: <Text style={styles.entryText}>{rowData.age}</Text>
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    if (!this.state.loaded) {
      return (
        <Text>Loading...</Text>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </View>
      </View>
    );
  }
}

export default DogList;
