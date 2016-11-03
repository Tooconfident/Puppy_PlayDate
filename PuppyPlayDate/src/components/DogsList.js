import React, { Component } from 'react';
import {
  ListView,
  Text,
  StyleSheet
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import DogListItem from './DogListItem';
import DogProfile from './DogProfile';

export default class DogsList extends Component {
  constructor(props) {
    super(props);

    console.log("DogsList props", props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log("DogsList WillReceiveProps");
  //
  //   if (nextProps.dogs !== this.props.dogs) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dogs),
  //     });
  //   }
  // }

  onPressDogShow(id) {
    console.log("onPressDogShow(" + id + ")");

    // this.props.navigator.push({
    //   title: 'Dog Profile',
    //   component: DogProfile,
    //   passProps: { dog_id: id },
    // });
    Actions.dogProfile({ dog_id: id });
  }

  // Entry row
  renderRow(rowData, sectionID, rowID) {
    // console.log("Rendering a row. . .");
    // console.log("rowData.avatar = " + rowData.avatar);

    return (
      <DogListItem
        item={rowData}
        onPress={this.onPressDogShow.bind(this)}
      />
    );
  }

  render() {
    const { dogs } = this.props;
    const dataSource = this.state.dataSource.cloneWithRows(dogs);

    if (!dogs) {
      return <Text>Loading...</Text>;
    }

    return (
      <ListView
        style={styles.dogList}
        dataSource={dataSource}
        renderRow={this.renderRow.bind(this)}
      />
    );
  }

}

const styles = StyleSheet.create({
  dogList: {
    backgroundColor: 'rgb(239,239,239)',
    // borderWidth: 1,
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 8,
  },
});
