import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  NavigatorIOS,
  TabBarIOS,
  TouchableHighlight,
} from 'react-native';

/*
 * This is a component for a navigation bar at the top of the page.
 * It includes a back button on the left-hand side of the navbar.
 * It has a page title that is centered
 * To add stuff after the page title, just nest a child (e.g an Edit button)
 * in the component like: <Navbar ...> NestedChildHere </Navbar>
 *
 * Note: you have to pass the navigator as props in order for the component
 * back button to work
 */
class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("Navbar: props: ");
    for (var key in this.props) {
      console.log("+" + key + ": " + this.props[key]);
    }
    console.log("// state: " + this.state);
  }

  goBack() {
    this.props.navigator.pop();
  }

  backButton() {
    console.log("Adding backButton . . .");
    return (
      <TouchableHighlight style={styles.backButton} onPress={() => this.goBack()}>
        <Text>Back</Text>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.navbar}>
        {this.props.hasBackButton ? this.backButton() : <Text></Text>}

        <Text style={styles.pageTitle}>{this.props.title}</Text>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
    marginTop: 20,
    backgroundColor: 'skyblue',
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    borderWidth: 1,
    padding: 10,
    alignSelf: 'flex-start'
  },
  editButton: {
    borderWidth: 1,
    padding: 10,
    alignSelf: 'flex-end',
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

Navbar.propTypes = {
  navigator: React.PropTypes.object.isRequired,
};

Navbar.defaultProps = {
  hasBackButton: true,
};

export default Navbar;
