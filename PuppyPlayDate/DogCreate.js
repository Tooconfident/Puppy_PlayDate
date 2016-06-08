import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  NavigatorIOS,
  Image,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';

const REQUEST_URL= 'http://localhost:3000/dogs';

class DogCreate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      breed: "",
      age: "",
      toy: "",
      avatar: "",
    }
  }

  componentDidMount() {
    AsyncStorage.getItem("userID").then((value) => {
      console.log('current.val '+ value);
        this.setState({userID: value});
    }).done();
  }

  onPressCreate() {
    // TODO: create dog in backend
    fetch(REQUEST_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        age: this.state.age,
        breed: this.state.breed,
        toy: this.state.toy,
        user_id: this.state.userID,

      })
    })
    .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)
        if (responseData.success != false){
          //Add a Dog
          this.props.navigator.popN(2);
        } else {
          AlertIOS.alert(
           'Something went wrong!'
          );
        }
      })
      .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Welcome USER to PuppyPlayDate!
        </Text>

        <Text style={styles.bigText}>
          Tell us About your Dog
        </Text>

        <TextInput
          placeholder="Dog Name"
          style={styles.input}
          value = {this.state.name}
          onChangeText = {(text)=> this.setState({name:text})}
        />

        <TextInput
          placeholder="Breed"
          style={styles.input}
          value = {this.state.breed}
          onChangeText = {(text)=> this.setState({breed:text})}

        />

        <TextInput
          placeholder="Age"
          style={styles.input}
          value = {this.state.age}
          onChangeText = {(text)=> this.setState({age:text})}

        />

        <TextInput
          placeholder="Favorite Toy"
          style={styles.input}
          value = {this.state.toy}
          onChangeText = {(text)=> this.setState({toy:text})}

        />

        <TouchableHighlight
          style={styles.cameraButton}>
          <Image source={require("./Resources/dog_avatar.png")} style={styles.image}>
            <Text>
              Add Photo
            </Text>
          </Image>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.onPressCreate()}
        >
          <Text style={styles.buttonText}>
            Add Dog
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
  },
  bigText: {
    fontSize: 60,
  },
  button: {
    height: 36,
    backgroundColor: "#48bbec",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "stretch",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center",
  },
  input: {
    height: 40,
  },
  image: {
    height: 100,
    width: 100,
  }
});

module.exports = DogCreate;
