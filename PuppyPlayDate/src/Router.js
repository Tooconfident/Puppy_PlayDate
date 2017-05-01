import React from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';

import Register from './components/auth/Register.js';
import Login from './components/auth/Login.js';

import MapScene from './components/MapScene';
import UserDogs from './components/UserDogs';
import DogCreate from './components/DogCreate';
import DogProfile from './components/DogProfile';
import DogEdit from './components/DogEdit';
import UserEdit from './components/UserEdit';
import PlayDates from './components/PlayDates';
import PlayDateCreate from './components/PlayDateCreate';
import PlayDateShow from './components/PlayDateShow';
import PlayDateEdit from './components/PlayDateEdit';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="auth" initial>
        <Scene key="login" component={Login} title="Puppy Playdate" initial />
        <Scene key="register" component={Register} title="Signup" />
      </Scene>

      <Scene key="main">
        <Scene key="map" component={MapScene} title="Puppy Playdate" initial />

        <Scene key="userProfile" component={UserDogs} title="Profile" />
        <Scene key="dogNew" component={DogCreate} title="Add Dog" />
        <Scene key="dogProfile" component={DogProfile} title="Dog Profile" />
        <Scene key="dogEdit" component={DogEdit} title="Edit Dog Profile" />
        <Scene key="userEdit" component={UserEdit} title="Edit User Profile" />

        <Scene key="userPlaydates" component={PlayDates} title="Playdates" />
        <Scene key="userPlaydateNew" component={PlayDateCreate} title="PlayDate" />
        <Scene key="playdateShow" component={PlayDateShow} title="Playdate" />
        <Scene key="userPlaydateEdit" component={PlayDateEdit} title="Edit Playdate" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
