/**
 * Puppy Play Date
 * https://github.com/Tooconfident/Puppy_PlayDate
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TabBarIOS
} from 'react-native';

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

import MainScene from './MainScene';
import TestPage from './TestPage';
import UserDogs from './UserDogs';
import PlayDates from './PlayDates';
import PlayDateCreate from './PlayDateCreate';

class PuppyPlayDateApp extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTab: "main",
    };
  }
  renderScene(route, navigator){
    console.log("renderScene was called: passProps: " + route.passProps);
    return(
      <route.component navigator={navigator} {...route.passProps}/>
    );
  }
  render() {
    return (
      <TabBarIOS
        barTintColor= "black"
        unselectedTintColor= "red"
        tintColor= "white"
        selectedTab={this.state.selectedTab}
      >
         <TabBarIOS.Item
          icon = {{uri: base64Icon, scale: 3}}
          title = "Home"
          selected = {this.state.selectedTab === "main"}
          onPress = {() => {
            console.log("Pressed");
            this.setState({
              selectedTab: "main"
            });
          }}
         >

           <Navigator
           renderScene = {this.renderScene}
           initialRoute = {{
             title: 'PuppyPlayDate',
             component: MainScene,
           }}
           />
         </TabBarIOS.Item>

         <TabBarIOS.Item
          title = "Profile"
          selected = {this.state.selectedTab === "profile"}
          icon = {{uri: base64Icon, scale: 3}}
          onPress = {() => {
            this.setState({
              selectedTab: "profile"
            });
          }}
         >
         <Navigator
         renderScene = {this.renderScene}
         initialRoute = {{
           title: 'Profile',
           component: UserDogs,
         }}
         />
        </TabBarIOS.Item>

        <TabBarIOS.Item
         title = "PlayDates"
         selected = {this.state.selectedTab === "playdates"}
         icon = {{uri: base64Icon, scale: 3}}
         onPress = {() => {
           this.setState({
             selectedTab: "playdates"
           });
         }}
        >
        <Navigator
        renderScene = {this.renderScene}
        initialRoute = {{
          title: 'PlayDates',
          component: PlayDates,
        }}
        />
       </TabBarIOS.Item>

       <TabBarIOS.Item
        title = "Test"
        selected = {this.state.selectedTab === "test"}
        icon = {{uri: base64Icon, scale: 3}}
        onPress = {() => {
          this.setState({
            selectedTab: "test"
          });
        }}
       >
       <Navigator
       renderScene = {this.renderScene}
       initialRoute = {{
         title: 'Test',
         component: TestPage,
       }}
       />
      </TabBarIOS.Item>

      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  tabBar: {
    backgroundColor: 'black',
  },
});

AppRegistry.registerComponent('PuppyPlayDate', () => PuppyPlayDateApp);
