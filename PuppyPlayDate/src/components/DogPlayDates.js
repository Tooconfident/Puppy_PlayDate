import React, { Component } from 'react';
import {
  ListView,
  Text,
  TouchableHighlight,
  View,
  AsyncStorage,
  Alert,

} from 'react-native';

import PlayDateShow from './PlayDateShow';
import PlayDateCreate from './PlayDateCreate';

const styles = require('../style');

const REQUEST_URL = 'http://localhost:3000/dogs/playdates';
const LEAVE_URL = 'http://localhost:3000/memberships/leave/';

class DogPlayDates extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      userID: 0,
      loaded: false,
    };

    console.log("Constructor for Dog dates called");
  }

  componentWillMount() {
    AsyncStorage.getItem("userID").then((value) => {
      console.log('current.val ' + value);
      this.setState({ userID: value });
    })
    .then((value) => {
      this.fetchData();
    })
    .done();

    console.log("componentDidMount for Playdates called");
  }

  fetchData() {
    fetch(REQUEST_URL + "?dog_id=" + this.props.dog_id)
      .then((response) => response.json())
      .then((responseData) => {
        console.log('>>>>');
        console.log(responseData);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
          responseData: responseData[0]
        });
      })
      .done();
  }

  onPressPlayDate(id) {
    console.log("onPressPlayDate(" + id + ")");

    this.props.navigator.push({
      component: PlayDateShow,
      passProps: {
        playdate_id: id,
        dog_id: this.props.dog_id
      }
    });
  }

  goBack() {
    this.props.navigator.pop();
  }
  leavePlaydate(playdate_id) {
    console.log("press leave");
    console.log(this.state.responseData.id);
    fetch(LEAVE_URL + "?id=" + this.state.responseData.id + "&dog_id=" + this.props.dog_id + "", {
      method: "POST",
      hearders: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.props.playdate_id,
        dog_id: this.props.dog_id,
      })
    })
    .then((response) => {
        console.log(this.responseData);
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
        if (responseData.success) {
          this.props.navigator.pop(2);
        } else {
          Alert.alert(
            "Something went wrong!"
          );
        }
      })
      .done();
    }

  onPressLeave() {
    console.log("Confirmed");

    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => this.leavePlaydate() },
      ]
    );
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight onPress={() => this.onPressPlayDate(rowData.id)}>
        <View style={styles.listEntry}>
          <View style={styles.listEntryContent}>
            <View style={styles.rowWithLeave}>
              <Text style={styles.entryLabel}>
                {rowData.name + rowData.id}
              </Text>

              <Text style={styles.entryLabel}>Location: <Text style={styles.entryText}>{rowData.address}</Text></Text>

              <Text style={styles.entryLabel}>Day and Time: <Text style={styles.entryText}>{rowData.time_day}</Text></Text>

              <Text style={styles.entryLabel}>Description: <Text style={styles.entryText}>{rowData.description}</Text></Text>
              <TouchableHighlight style={styles.deleteButton} onPress={() => this.onPressLeave(rowData.id)}>
                <Text>Leave</Text>
              </TouchableHighlight>
            </View>

          </View>
        </View>
      </TouchableHighlight>
    );
  }

  addGroupPressed() {
    console.log('addGroupPressed');
    this.props.navigator.push({
      title: 'PlayDate',
      component: PlayDateCreate,
      //passProps: {},
    });
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

export default DogPlayDates;
