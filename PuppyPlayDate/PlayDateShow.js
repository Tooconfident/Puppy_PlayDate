import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  ListView,
  StyleSheet,
  ScrollView,
  AppRegistry,
  NavigatorIOS,
  TouchableHighlight,
} from 'react-native';

import PlayDateEdit from "./PlayDateEdit";
import DogList from "./DogList";

const styles = require('./style.js');

const REQUEST_URL = 'http://localhost:3000/playdates/';
const LEAVE_URL = 'http://localhost:3000/memberships/leave/';

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
    // AsyncStorage.getItem("userID").then((value) => {
    //   console.log('current.val '+ value);
    //     this.setState({userID: value});
    // })
    // .then((value) => {
    //   this.fetchData();
    // })
    // .done();

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

  leavePlaydate() {
    console.log(this.props)
    console.log("press leave")
    fetch(LEAVE_URL+"?id="+this.props.playdate_id+"&dog_id="+this.props.dog_id+"", {
      method: "POST",
      hearders: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.props.playdate_id,
        dog_id: this.props.dog_id,
      })
    })
    .then((response) => {
        console.log(response);
        return response.json()
      })
      .then((responseData) => {
        console.log(responseData)
        if(responseData.success) {
          render()
        } else {
          Alert.alert(
            "Something went wrong!"
          );
        }
      })
      .done();
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

  onJoin() {
    Alert.alert(
      "Join Group?",
      "",
    )
  }

  onPressLeave() {

    Alert.alert(
      "Leave Group?",
      "",
      [
      {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Yes', onPress: () => {
        this.leavePlaydate();
        this.render();

        }},
      ],
      );
  }

  render() {
    var group = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>

          <ScrollView>

            <View style={{alignSelf: 'center', marginBottom: 10}}>
              <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                {group.name}
              </Text>
              </View>

              <View style={{marginBottom: 10, flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableHighlight onPress={() => this.props.navigator.push({
                  title: 'Choose a dog',
                  component: DogList,
                  passProps:{
                    group_id: group.id,
                  }
                })}>
                  <Text style={styles.joinGroupText}>Join Group</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={()=>{
                  Alert.alert(
                    'Are you sure you want to leave',
                    '',
                    [
                      {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                      {text: 'OK', onPress: () => this.leavePlaydate()},
                    ]
                  );
                }}>
                  <Text style={styles.leaveGroupText}>Leave Group</Text>
                </TouchableHighlight>
              </View>



            <View style={[{borderRadius: 9}, styles.dogList]}>
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

              <TouchableHighlight style={styles.editPlaydate} onPress={() => this.onPressEdit()}>
                <Text style={{alignSelf: 'flex-end', marginRight: 36, color: 'blue'}}>Edit</Text>
              </TouchableHighlight>
              </View>
            </ScrollView>
          </View>
        </View>

    );
  }
}

export default PlayDateShow;
