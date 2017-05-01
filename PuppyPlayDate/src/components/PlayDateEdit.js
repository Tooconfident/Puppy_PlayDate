import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { InputText } from './form';
import { fetchPlaydate, updateEditPlaydateForm, updatePlaydate } from '../actions/index';

const styles = require('../style');

class PlayDateEdit extends Component {

  constructor(props) {
    super(props);

    // Initialize Playdate Attributes
    this.state = {
      id: "",
      loaded: false,
    };
  }

  componentDidMount() {
    // As soon as the component is mounted, go and fetch the data for the playdate
    this.fetchData();
  }

  // Performs an Ajax call to retrieve information about the playdate
  fetchData() {
    console.log("fetchData: PlayDateEdit: playdate_id", this.props.playdate_id);

    this.props.fetchPlaydate(this.props.playdate_id)
      .then(() => {
        console.log(this.props.playdate);

        const responseData = this.props.playdate;
        const { name, address, time_day, description } = this.props.playdate;

        this.setState({
          id: responseData.id,
          loaded: true,
        });

        this.props.updateEditPlaydateForm({
          name,
          address,
          time_day,
          description,
        });
      });
  }

  onEditPress() {
    const { name, address, time_day, description } = this.props;
    const { id } = this.props.playdate;

    const playdate = {
      id, // very important to not confuse this with form fields
      name,
      address,
      time_day,
      description
    };

    // TODO: perform an update request to update the
    // playdate information in the backend
    this.props.updatePlaydate(playdate)
      .then(() => {
        Actions.pop({ loaded: false });
      })
      .catch((error) => {
        console.log("There was a problem in updating the playdate.", error);
      });
  }

  render() {
    const { name, address, time_day, description, updateEditPlaydateForm } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>

          <InputText
            placeholder="Playdate Name"
            value={name}
            onChangeText={name => updateEditPlaydateForm({ name })}
          />

          <InputText
            placeholder="Address"
            value={address}
            onChangeText={address => updateEditPlaydateForm({ address })}
          />

          <InputText
            placeholder="Date and Time"
            value={time_day}
            onChangeText={time_day => updateEditPlaydateForm({ time_day })}
          />

          <TextInput
            placeholder="Description"
            style={[styles.inputText, styles.textArea]}
            value={description}
            onChangeText={description => updateEditPlaydateForm({ description })}
            multiline
          />

          <TouchableHighlight
            style={styles.submitButton}
            onPress={this.onEditPress.bind(this)}
            underlayColor='#99d9f4'
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { playdate: state.playdates.playdate, ...state.playdateEditForm };
}

export default connect(
  mapStateToProps,
  {
    fetchPlaydate,
    updateEditPlaydateForm,
    updatePlaydate
  }
)(PlayDateEdit);
