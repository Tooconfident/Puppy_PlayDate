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

var REQUEST_URL = 'http://localhost:3000/users/23';

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
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.dogs),
          loaded: true,
        });
      })
      .done();

  }
  renderRow(rowData, sectionID, rowID){
    return(
      <TouchableHighlight>
        <View style={styles.rowContainer}>
          <Image style={styles.thumb} source={{ uri: rowData.image }}/>
          <View style={styles.textContainer}>
            <Text>
              {rowData.name} {rowData.age}
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
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
      />
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
});

module.exports = UserDogs;
