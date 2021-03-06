import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  NavigatorIOS,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import DogProfile from './DogProfile';
import DogCreate from './DogCreate';
import UserEdit from './UserEdit';

const styles = require('./style.js');

// URL to the API to get a specific user if you append an id
var REQUEST_URL = 'http://localhost:3000/users/';

class UserDogs extends Component {
  constructor(props){
    super(props);

    this.state = {
      dataSource: new ListView.DataSource(
        {rowHasChanged: (r1, r2) => r1 !== r2}
      ),
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
      console.log('userID: current.val '+ value);
      this.setState({
        userID: value
      });
    })
    .then((value) => {
      this.fetchData();
    })
    .done();
  }

  componentWillReceiveProps() {
    console.log("UserDogs WillReceiveProps");
    if (!this.props.loaded) {
       this.fetchData();
     }
  }

  fetchData() {
    console.log("fetchData for UserDogs using " + this.state.userID + "for userID");
    // assume a user_id is passed to this component
    fetch(REQUEST_URL + this.state.userID)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          username: responseData.username,
          name: responseData.name,
          dataSource: this.state.dataSource.cloneWithRows(responseData.dogs),
          loaded: true,
        });
      })
      .done();

  }

  onPressDogShow(id) {
    console.log("onPressDogShow(" + id + ")")
    this.props.navigator.push({
      title: 'Dog Profile',
      component: DogProfile,
      passProps: { dog_id: id },
    });
  }

  onPressEdit() {
    console.log("onPressEdit")
    this.props.navigator.push({
      title: 'Edit User Profile',
      component: UserEdit,
      passProps: { user_id: this.state.userID },
    });
  }

  onPressAdd() {
    console.log("onPressAdd")
    this.props.navigator.push({
      title: 'Add Dog',
      component: DogCreate,
      passProps: { user_id: this.state.userID },
    });
  }

  // Entry row
  renderRow(rowData, sectionID, rowID){
    console.log("Rendering a row. . .");
    console.log("rowData.avatar = " + rowData.avatar);

    return(
      <TouchableHighlight onPress={() => this.onPressDogShow(rowData.id)}>
        <View style={styles.listEntry}>
          <Image style={styles.entryAvatar} source={{ uri: rowData.avatar }}/>

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

  render(){
    if (!this.state.loaded){
      return(<Text>Loading...</Text>)
    }

    return(
      <View style={styles.container}>
        <View style={styles.innerContainer}>

          <View style={styles.userProfileTop}>
            <Text style={styles.entryLabel}>{this.state.name + "'s Dogs"}</Text>
            <TouchableOpacity
              style={styles.editProfileButton} onPress={() => this.onPressEdit()}>
              <Text style={styles.editProfileButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <TouchableHighlight style={[styles.addButton, {alignSelf: "flex-end"}]} onPress={() => this.onPressAdd()}>
            <Text style={styles.addButtonText} >+ Add Dog</Text>
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

// const styles = StyleSheet.create({
//   mainContent: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'flex-start',
//   },
//   thumb: {
//     width: 50,
//     height: 50,
//     marginRight: 10,
//     borderRadius: 50/2,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   rowContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     padding: 10,
//     borderBottomWidth: 2,
//     paddingTop: 12,
//     paddingBottom: 12,
//   },
//   container: {
//     flex: 1,
//     flexWrap: 'wrap',
//     alignItems: 'center',
//     justifyContent: 'center',
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
//   navbar: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 20,
//     backgroundColor: 'skyblue',
//     marginBottom: 6,
//     height: 30,
//   },
// });

module.exports = UserDogs;
