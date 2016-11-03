import React, { Component } from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  TabBarIOS,
  Text,
  TouchableHighlight,
  View,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { fetchUserPlaydates } from '../actions/index';

import PlayDateCreate from './PlayDateCreate';
import MainScene from './MainScene';
import PlayDateShow from './PlayDateShow';

const styles = require('../style');

class PlayDates extends Component {

  constructor(props){
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource,
      userID: 0,
      loaded: false,
    };

    console.log("Constructor for Playdates called");
  }

  componentWillMount(){
    AsyncStorage.getItem("userID").then((userId) => {
      console.log('current.val '+ userId);
      // Set the user id in the state
      this.setState({ userID: userId });
      // Fetch all playdates for the given user id
      this.props.fetchUserPlaydates(userId);
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

  onPressPlayDate(id) {
    console.log("onPressPlayDate(" + id + ")")
    // this.props.navigator.push({
    //   title: "Playdate",
    //   component: PlayDateShow,
    //   passProps: { playdate_id: id }
    // });
    Actions.playdateShow({ playdate_id: id });
  }

  goBack() {
    // this.props.navigator.pop();
    Actions.pop();
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
    // this.props.navigator.push({
    //   title: 'PlayDate',
    //   component: PlayDateCreate,
    //   //passProps: {},
    // });
    Actions.userPlaydateNew();
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
  return { playdates: state.playdates.own };
}

export default connect(mapStateToProps, { fetchUserPlaydates })(PlayDates);
