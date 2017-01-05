import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator
} from 'react-native';

import Meteor, { createContainer } from 'react-native-meteor';

import FBSDK from 'react-native-fbsdk';

import TestScene from '../scenes/TestScene';
import HomeScene from '../scenes/HomeScene';
import Scene2 from '../scenes/Scene2';
import Scene3 from '../scenes/Scene3';
import Scene4 from '../scenes/Scene4';
import Scene5 from '../scenes/Scene5';

const { LoginButton, AccessToken } = FBSDK;

const SERVER_URL = 'ws://localhost:3000/websocket';

const onLoginFinished = (error, result) => {
  if (error) {
    alert("login has error: " + result.error);
  } else if (result.isCancelled) {
    alert("login is cancelled.");
  } else {
    alert("login has finished with permissions: " + result.grantedPermissions)
  }
};

class App extends Component {
  componentWillMount() {
    Meteor.connect(SERVER_URL);
  }




  render() {
    return (
          <Navigator
            initialRoute = {{screen: 'HomeScene'}}
            renderScene = {(route,nav) => {return this.renderScene(route,nav)}}
          />

    );
  }
  renderScene (route, nav) {
    switch (route.screen) {
      case "HomeScene":
        return <HomeScene navigator = { nav } count = { this.props.count } />
      case "TestScene":
        return <TestScene navigator = { nav } />
      case "Scene2":
        return <Scene2 navigator = { nav } />
      case "Scene3":
        return <Scene3 navigator = { nav } />
      case "Scene4":
        return <Scene4 navigator = { nav } />
      case "Scene5":
        return <Scene5 navigator = { nav } />
    }
  }
};

export default createContainer(() => {
  Meteor.subscribe('habits');
  return {
    count: Meteor.collection('habits').find().length,
  };
}, App);