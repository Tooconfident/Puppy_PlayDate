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
import { connect } from 'react-redux';

import { fetchPlaydates } from '../actions/index';

import PlayDateCreate from './PlayDateCreate';
import MainScene from './MainScene';
import PlayDateShow from './PlayDateShow';

const styles = require('../style.js');

const REQUEST_URL = 'http://localhost:3000/playdates';

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

    console.log("componentWillMount for Playdates finished");
  }

  componentWillReceiveProps(nextProps) {
    console.log('PlayDates: componentWillReceiveProps');
    if (nextProps.playdates !== this.props.playdates) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.playdates),
        loaded: true,
      });
    }
    console.log("State is now", this.state);
  }

  fetchData() {
    this.props.fetchPlaydates(this.state.userID);
  }

  onPressPlayDate(id) {
    console.log("onPressPlayDate(" + id + ")")
    this.props.navigator.push({
      title: "Playdate",
      component: PlayDateShow,
      passProps: { playdate_id: id }
    });
  }

  goBack() {
    this.props.navigator.pop();
  }

  renderRow(rowData, sectionID, rowID){
    return(
      <TouchableHighlight
        underlayColor='transparent'
        onPress={() => this.onPressPlayDate(rowData.id)}>
        <View style={styles.listEntry}>
          <View style={styles.listEntryContent}>

            <Text style={styles.entryLabelTitle}>
              {rowData.name}
            </Text>

            <Text style={[styles.entryLabel, styles.entryLabelSmall]}>Address: <Text style={[styles.entryText, styles.entryTextSmall]}>{rowData.address}</Text></Text>

            <Text style={[styles.entryLabel, styles.entryLabelSmall]}>Day and Time: <Text style={[styles.entryText, styles.entryTextSmall]}>{rowData.time_day}</Text></Text>

            {
            //<Text style={[styles.entryLabel, styles.entryLabelSmall]}>Description: <Text style={[styles.entryText, styles.entryTextSmall]}>{rowData.description}</Text></Text>
            }

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
    if (!this.props.playdates) {
      return(<Text>Loading...</Text>)
    }

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>

          <TouchableHighlight
            style={styles.addButton}
            onPress={() => this.addGroupPressed()}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableHighlight>

          <ListView
            style={styles.dogList}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { playdates: state.playdates.all };
}

export default connect(mapStateToProps, { fetchPlaydates })(PlayDates);
