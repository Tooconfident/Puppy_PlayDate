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
import Navbar from './Navbar';

var REQUEST_URL = 'http://localhost:3000/playdates';

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
    fetch(REQUEST_URL + "?user_id=" + this.state.userID)
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
        <View style={styles.rowContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {rowData.name}
            </Text>
            <Text>
              <Text style={styles.subtitle}>Location:</Text> {rowData.location}
              {', '}
              <Text style={styles.subtitle}>Day and Time:</Text> {rowData.time_day}
            </Text>
            <Text>{this.props.ola}</Text>
            <Text>
              <Text style={styles.subtitle}>Description:</Text> {rowData.description}
            </Text>
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
      <View style={{marginTop: 80, flex: 1}}>
        <TouchableHighlight
          style={styles.editButton}
          onPress={() => this.addGroupPressed()}>
          <Text>Add<Text>{this.props.quickfix}</Text></Text>
        </TouchableHighlight>

        <View style={styles.container}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 10,
    backgroundColor: 'antiquewhite'
  },
  editButton: {
    borderWidth: 1,
    padding: 10,
    alignSelf: 'flex-end',
  },
  textContainer: {
    flex: 1,
    flexWrap: 'wrap',
  },
  rowContainer: {
    flexDirection: 'column',
    padding: 10,
    borderBottomWidth: 2,
  },
  pageTitle: {
    marginTop: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    backgroundColor: 'skyblue',
    marginBottom: 6,
  },
});

module.exports = PlayDates;
