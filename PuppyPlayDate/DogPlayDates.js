import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  NavigatorIOS,
  StyleSheet,
  TabBarIOS,
  Text,
  TouchableHighlight,
  View,
  AsyncStorage,
} from 'react-native';

import PlayDateCreate from './PlayDateCreate';
import MainScene from './MainScene';
import PlayDateShow from './PlayDateShow';

const styles = require('./style.js');

var REQUEST_URL = 'http://localhost:3000/dogs/playdates';

class PlayDates extends Component {

  constructor(props){
    super(props);

    this.state = {
      dataSource : new ListView.DataSource(
        {rowHasChanged: (r1, r2) => r1 !== r2}
      ),
      userID: 0,
      loaded: false,
    };

    console.log("Constructor for Playdates called");
  }

  componentWillMount(){
    AsyncStorage.getItem("userID").then((value) => {
      console.log('current.val '+ value);
        this.setState({userID: value});
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
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  }

  onPressPlayDate(id) {
    console.log("onPressPlayDate(" + id + ")")
    this.props.navigator.push({
      component: PlayDateShow,
      passProps: { playdate_id: id }
    });
  }

  goBack() {
    this.props.navigator.pop();
  }

  renderRow(rowData, sectionID, rowID){
    return(
      <TouchableHighlight onPress={() => this.onPressPlayDate(rowData.id)}>
        <View style={styles.listEntry}>
          <View style={styles.listEntryContent}>

            <Text style={styles.entryLabel}>
              {rowData.name}
            </Text>

            <Text style={styles.entryLabel}>Location: <Text style={styles.entryText}>{rowData.address}</Text></Text>

            <Text style={styles.entryLabel}>Day and Time: <Text style={styles.entryText}>{rowData.time_day}</Text></Text>

            <Text style={styles.entryLabel}>Description: <Text style={styles.entryText}>{rowData.description}</Text></Text>

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
      return(<Text>Loading...</Text>)
    }

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <TouchableHighlight
            onPress={() => this.addGroupPressed()}>
            <Text>Add</Text>
          </TouchableHighlight>

          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </View>
      </View>
    );
  }
}



module.exports = PlayDates;
