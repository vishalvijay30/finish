import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator,
  AppState,
  PushNotificationIOS
} from 'react-native';

import HomeScene from './scenes/HomeScene';
import LoginScene from './scenes/LoginScene';
import Scene3 from './scenes/Scene3';
import Scene5 from './scenes/Scene5';

import Meteor from 'react-native-meteor';
import PushNotification from 'react-native-push-notification';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.decideNotificationMessage = this.decideNotificationMessage.bind(this);
    this.onLocalNotification = this.onLocalNotification.bind(this);
  }

  componentWillMount() {
    PushNotificationIOS.addEventListener('localNotification', this.onLocalNotification);
    PushNotificationIOS.requestPermissions();
  }

  componentDidMount() {
    //PushNotificationIOS.cancelAllLocalNotifications(0);
    var today = new Date();
    if (today.getHours() < 19) {
      PushNotificationIOS.cancelAllLocalNotifications(0);
      PushNotificationIOS.scheduleLocalNotification({
        fireDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 19, 0, 0).toISOString(),
        alertBody: this.decideNotificationMessage(today),
      });
    } else {
      PushNotificationIOS.cancelAllLocalNotifications(0);
      today.setDate(today.getDate()+1);
      PushNotificationIOS.scheduleLocalNotification({
        fireDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 19, 0, 0).toISOString(),
        alertBody: this.decideNotificationMessage(today),
      });

    }
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    console.log("App State: "+appState);
    PushNotificationIOS.getScheduledLocalNotifications((res) => {
      console.log(res);
    });
  }
  // getDate() {
  //   var today = new Date();
  //   if (today.getHours() < 6) {
  //     return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 6, 0, 0);
  //   } else if (today.getHours() > 6 && today.getHours() < 15) {
  //     return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20, 0, 0);
  //   } else {
  //     //var tomorrow = new Date(today.getDate() + 1);
  //     today.setDate(today.getDate() + 1);
  //     return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 6, 0, 0);
  //     //return new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 6, 0, 0);
  //   }
  // }

  decideNotificationMessage(notifDate) {
    var today = notifDate;

    if (today.getDay() == 1) {
      return "Any habits remaining that need to be completed? Would not want to start the week off without a perfect Monday. Let’s finish those remaining habits!";
    } else if (today.getDay() == 2) {
      return "Complete any last habits you have. Keep both your streak and your momentum going!";
    } else if (today.getDay() == 3) {
      return "This is too easy for you. You got this :) Finish up those last couple habits!";
    } else if (today.getDay() == 4) {
      return "One more day till the weekend. Any last habits remaining? Get Them Done!";
    } else if (today.getDay() == 5) {
      return "Keep your streaks alive!";
    } else if (today.getDay() == 6) {
      return "Enjoy your day off from work? Good, now complete those habits to keep those streaks alive!";
    } else if (today.getDay() == 0) {
      return "Recharge, and get excited. We got another week ahead and we are all on the same journey with you. Remember one week at a time.";
    }
  }

  onLocalNotification(notification) {
    console.log(notification);
    var today = new Date();
    today.setDate(today.getDate()+1);
      PushNotificationIOS.scheduleLocalNotification({
        fireDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 19, 0, 0).toISOString(),
        alertBody: this.decideNotificationMessage(today),
      });
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
