import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator,
  AppState
} from 'react-native';

import {loginWithTokens, onLoginFinished} from './fb-login';

import HomeScene from '../scenes/HomeScene';
import LoginScene from '../scenes/LoginScene';
import Scene3 from '../scenes/Scene3';
import Scene5 from '../scenes/Scene5';

import Meteor from 'react-native-meteor';
import PushNotification from 'react-native-push-notification';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
   }

  componentDidMount() {
    PushNotification.configure({
            onNotification: function(notification) {
                console.log('NOTIFICATION:', notification);
            },
        });
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    var today = new Date();
    console.log("App State: " + appState);
    if (appState === 'inactive') {
      PushNotification.localNotificationSchedule({
        message:'My Notification Message',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), this.getHour(), 42, 0),
      });
    }

    if (appState === 'background') {
      PushNotification.localNotificationSchedule({
        message:'My Notification Message',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), this.getHour(), 42, 0),
      });
    }
  }

  getHour() {
    var today = new Date();
    if (today.getHours() < 9) {
      return 9;
    } else {
      return 23;
    }
  }

  render() {

      return (
          <Navigator
            initialRoute = {{screen: 'HomeScene'}}
            renderScene = {(route,nav) => {return this.renderScene(route,nav)}}
            //configureScene = {(route) => {if (route.screen == "Scene3"){return Navigator.SceneConfigs.VerticalUpSwipeJump}else{return Navigator.SceneConfigs.PushFromRight}}}
          />
      );

  }
  renderScene (route, nav) {
    switch (route.screen) {
      case "HomeScene":

        return <HomeScene navigator = { nav } />
      case "LoginScene":
        return <LoginScene navigator = { nav } />

      case "Scene3":
        return <Scene3 navigator = { nav } user = {route.user} db={route.db} />
      case "Scene5":
        return <Scene5 navigator = { nav } user = {route.user} habit={route.document} />
    }
  }
};
