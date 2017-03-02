import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator,
  AppState
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
    //if (today.getMinutes() <= 59) {
    if (today.getHours() < 6 || today.getHours() > 6)
    if (appState === 'inactive') {
      PushNotification.localNotificationSchedule({
        message:this.decideNotificationMessage(),
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), this.getHour(), 7, 0),
      });
    }

    if (appState === 'background') {
      PushNotification.localNotificationSchedule({
        message:this.decideNotificationMessage(),
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), this.getHour(), 7, 0),
      });
    }
  //}
}

  getHour() {
    var today = new Date();
    if (today.getHours() < 6) {
      return 6;
    } else {
      return 20;
    }
  }

  decideNotificationMessage() {
    var today = new Date();

    if (today.getDay() == 1 && today.getHours() < 6) {
      return "Rise and shine! Your week starts today. Get off to the right start by completing one of your habits right away!";
    } else if (today.getDay() == 1 && today.getHours() >= 6) {
      return "Any habits remaining that need to be completed? Would not want to start the week off without a perfect Monday. Let’s finish those remaining habits!";
    } else if (today.getDay() == 2 && today.getHours() < 6) {
      return "Good morning! Use yesterday’s momentum to start on the right foot!";
    } else if (today.getDay() == 2 && today.getHours() >= 6) {
      return "Complete any last habits you have. Keep both your streak and your momentum going!";
    } else if (today.getDay() == 3 && today.getHours() < 6) {
      return "Halfway there! Take it one week at a time and you will be surprised how your progress adds up :)";
    } else if (today.getDay() == 3 && today.getHours() >= 6) {
      return "This is too easy for you. You got this!";
    } else if (today.getDay() == 4 && today.getHours() < 6) {
      return "Almost at the end of the workweek! End the week strong with no regrets :)";
    } else if (today.getDay() == 4 && today.getHours() >=6) {
      return "This is where we separate the adults from the children. Push through and get it done!";
    } else if (today.getDay() == 5 && today.getHours() < 6) {
      return "Clear eyes, full hearts, Can’t Lose!";
    } else if (today.getDay() == 5 && today.getHours() >= 6) {
      return "Spend a couple years of your life doing stuff others won’t, so you can spend the rest of your life doing stuff others can’t.";
    } else if (today.getDay() == 6 && today.getHours() < 6) {
      return "Remember. Offense, never defense. Those who are on the offensive win. We know you like to win.";
    } else if (today.getDay() == 6 && today.getHours() >=6) {
      return "Enjoy your day off from work? Good, now complete those habits to keep those streaks alive!";
    } else if (today.getDay() == 0 && today.getHours() < 6) {
      return "Relish in the positive, criticize the negative. What habits did you complete? What habits did you struggle to finish?";
    } else if (today.getDay() == 0 && today.getHours() >= 6) {
      return "Recharge, and get excited. We got another week ahead and we are all on the same journey with you. Remember one week at a time!";
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
