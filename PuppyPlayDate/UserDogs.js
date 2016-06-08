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
  AsyncStorage,
} from 'react-native';

import DogProfile from './DogProfile';
import DogCreate from './DogCreate';
import UserEdit from './UserEdit';
import Navbar from './Navbar';

// URL to the API to get a specific user if you append an id
var REQUEST_URL = 'http://localhost:3000/users/';

var data = [
  {name: "Pepito", age: 11, image: "http://www.avatarsdb.com/avatars/cute_puppy_dog.jpg"},
  {name: "Link", age: 4, image: "http://www.avatarsdb.com/avatars/cute_puppy_dog.jpg"},
  {name: "Ella", age: 7, image: "http://www.avatarsdb.com/avatars/cute_puppy_dog.jpg"},
  {name: "Macy Grey", age: 9, image: "http://www.avatarsdb.com/avatars/cute_puppy_dog.jpg"},
];

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

  onPressDogShow(id) {
    console.log("onPressDogShow(" + id + ")")
    this.props.navigator.push({
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
        <View>

          <TouchableHighlight onPress={() => this.onPressDogShow(rowData.id)}>
            <View style={styles.rowContainer}>

              <Image style={styles.thumb} source={{ uri: rowData.avatar }}/>

              <View style={styles.textContainer}>
                <Text>
                {rowData.name}
                </Text>
                <Text>
                Age: {rowData.age}
                </Text>
              </View>

            </View>
          </TouchableHighlight>

        </View>
    );
  }

  render(){
    if (!this.state.loaded){
      return(<Text>Loading...</Text>)
    }

    return(
      <View style={{marginTop: 80, flex: 1}}>
        <TouchableHighlight style={styles.editButton} onPress={() => this.onPressAdd()}>
          <Text>Add</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.editButton} onPress={() => this.onPressEdit()}>
          <Text>Edit</Text>
        </TouchableHighlight>
        <View style={styles.mainContent}>
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
  mainContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  thumb: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 50/2,
  },
  textContainer: {
    flex: 1,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 2,
    paddingTop: 12,
    paddingBottom: 12,
  },
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    backgroundColor: 'skyblue',
    marginBottom: 6,
    height: 30,
  },
});

module.exports = UserDogs;
