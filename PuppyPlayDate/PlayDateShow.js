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

import PlayDateEdit from "./PlayDateEdit";
import Navbar from "./Navbar";

var REQUEST_URL = 'http://localhost:3000/playdates/';

class PlayDateShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      group: {},
      loaded: false,
    };
  }

  componentDidMount(){
    console.log("PlayDateShow: componentDidMount: " + this.props.playdate_id);
    this.fetchData();
  }

  fetchData(){
    fetch(REQUEST_URL + this.props.playdate_id)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          group: responseData,
          loaded: true,
        });
      })
      .done();
  }

  goBack() {
    this.props.navigator.pop();
  }

  onPressEdit() {
    console.log("onPressEdit");
    this.props.navigator.push({
      component: PlayDateEdit,
      // Make sure to pass the playdate_id to the Edit component
      // Note the value has to be an object of key-value properties!
      passProps: { playdate_id: this.props.playdate_id }
    });
  }

  render() {
    var group = this.state.group;

    return (
      <View>
        <Navbar navigator={this.props.navigator} title='User Profile'>

            <TouchableHighlight style={styles.editButton} onPress={() => this.onPressEdit()}>
              <Text>Edit</Text>
            </TouchableHighlight>

        </Navbar>

        <View style={styles.container}>
          <Text style={styles.pageTitle}>
            {group.name}
          </Text>
          <Text>Join</Text>
          <Text>Leave</Text>
          <Text>
            Location: {group.location}
          </Text>
          <Text>
            Creator: Creator Name
          </Text>
          <Text>
            Number of Dogs: {group.member_count}
          </Text>
          <Text>
            Description: {group.description}
          </Text>
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
});

module.exports = PlayDateShow;
