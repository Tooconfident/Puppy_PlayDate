import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  Image,
  TouchableHighlight
} from 'react-native';

import DogProfile from './DogProfile';
import UserEdit from './UserEdit';

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
      dataSource : new ListView.DataSource(
        {rowHasChanged: (r1, r2) => r1 !== r2}
      ),
      loaded: false,
    };
    // var dataSource = new ListView.DataSource(
    //   {rowHasChanged: (r1, r2) => r1 !== r2}
    // );
    // this.state = {
    //   dataSource: dataSource.cloneWithRows(data)
    // }
  }
  componentDidMount(){
    this.fetchData();
  }
  fetchData(){
    // assume a user_id is passed to this component
    fetch(REQUEST_URL + this.props.user_id)
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
      component: UserEdit,
      passProps: { user_id: this.props.user_id },
    });
  }

  renderRow(rowData, sectionID, rowID){
    return(
        <View style={styles.container}>
          <TouchableHighlight onPress={() => this.onPressDogShow(rowData.id)}>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: rowData.image }}/>
            <View style={styles.textContainer}>
              <Text>
              {rowData.name} {rowData.age}
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
      <View>

        <View style={styles.navbar}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.onPressEdit()}
           >
            <Text>Edit</Text>
          </TouchableHighlight>
        </View>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    padding: 10,
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

module.exports = UserDogs;
