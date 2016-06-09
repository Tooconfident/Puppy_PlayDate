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
  TouchableHighlight,
} from 'react-native';

import PlayDateEdit from "./PlayDateEdit";

const styles = require('./style.js');

var REQUEST_URL = 'http://localhost:3000/playdates/';

class PlayDateShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      location: "",
      address: "",
      frequency: "",
      time_day: "",
      user_id: "",
      member_count: "",
      loaded: false,
    };
  }

  componentDidMount(){
    console.log("PlayDateShow: componentDidMount: " + this.props.playdate_id);
    this.fetchData();
  }

  componentWillReceiveProps() {
    console.log("PlayDateShow WillReceiveProps");
    if (!this.props.loaded) {
       this.fetchData();
     }
  }

  fetchData(){
    fetch(REQUEST_URL + this.props.playdate_id)
      .then((response) => response.json())
      .then((responseData) => {
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
    this.props.navigator.pop({
      passProps: {
        loaded: false,
      },
    });
  }

  onPressEdit() {
    console.log("onPressEdit");
    this.props.navigator.push({
      title: 'Edit Playdate',
      component: PlayDateEdit,
      // Make sure to pass the playdate_id to the Edit component
      // Note the value has to be an object of key-value properties!
      passProps: { playdate_id: this.props.playdate_id }
    });
  }

  render() {
    var group = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>

          <ScrollView>
            <View style={{alignSelf: 'center'}}>
              <TouchableHighlight style={styles.backButton} onPress={() => this.onPressEdit()}>
                <Text style={{alignSelf: 'center'}}>Edit</Text>
              </TouchableHighlight>
            </View>

            <View style={{alignSelf: 'center'}}>
              <Text style={styles.entryLabel}>
                {group.name}
              </Text>
            </View>

            <View style={{alignSelf: 'center', flexDirection: 'row'}}>
              <Text>Join </Text>
              <Text>Leave</Text>
            </View>

            <View style={styles.profileEntry}>
              <Text style={styles.entryLabel}>
                Address: <Text style={styles.entryText}>{group.address}</Text>
              </Text>
            </View>

            <View style={styles.profileEntry}>
              <Text style={styles.entryLabel}>
                Creator: <Text style={styles.entryText}>Creator Name</Text>
              </Text>
            </View>

            <View style={styles.profileEntry}>
              <Text style={styles.entryLabel}>
                Number of Dogs: <Text style={styles.entryText}>{group.member_count}</Text>
              </Text>
            </View>

            <View style={styles.profileEntry}>
              <Text style={styles.entryLabel}>
                Description: <Text style={styles.entryText}>{group.description}</Text>
              </Text>
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
//     flexWrap: 'wrap',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 70,
//   },
//   button: {
//     borderWidth: 2,
//     borderRadius: 12,
//     padding: 10,
//     backgroundColor: 'antiquewhite'
//   },
//   editButton: {
//     borderWidth: 1,
//     padding: 10,
//     alignSelf: 'flex-end',
//   },
//   backButton: {
//     borderWidth: 1,
//     padding: 10,
//     alignSelf: 'flex-start'
//   },
//   textContainer: {
//     flex: 1,
//     flexWrap: 'wrap',
//   },
//   rowContainer: {
//     flexDirection: 'column',
//     padding: 10,
//     borderBottomWidth: 2,
//   },
//   pageTitle: {
//     marginTop: 20,
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: 20,
//   },
//   subtitle: {
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
// });

module.exports = PlayDateShow;
