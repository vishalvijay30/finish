import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator,
  AppState,
  AsyncStorage
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
    this.state = {scheduleStatus:''};
    AsyncStorage.setItem('IS_SCHEDULED', 'false');
    // AsyncStorage.getItem('IS_SCHEDULED').then((value) => {
    //   this.setState({scheduleStatus:value});
    // });
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.decideNotificationMessage = this.decideNotificationMessage.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem('IS_SCHEDULED').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('IS_SCHEDULED', 'false');
        this.setState({scheduleStatus:'false'});
      } else {
        this.setState({scheduleStatus:value});
      }
    });
    var that = this;
    PushNotification.configure({
        onNotification: function(notification) {
            console.log('NOTIFICATION:', notification);
            AsyncStorage.removeItem('IS_SCHEDULED');
            AsyncStorage.setItem('IS_SCHEDULED', 'false');
            that.setState({scheduleStatus:'false'});
        },
    });
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    console.log('App State: '+appState);
    console.log('Schedule Status: '+this.state.scheduleStatus);
    var today = new Date();
    AsyncStorage.getItem('IS_SCHEDULED').then((value) => {
      console.log('VALUE: '+value);
      this.setState({scheduleStatus:value});
    });
    if (this.state.scheduleStatus === 'false') {
      console.log('reached');
      AsyncStorage.setItem('IS_SCHEDULED', 'true');
      if (appState === 'inactive') {
        PushNotification.localNotificationSchedule({
          message:this.decideNotificationMessage(),
          date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), this.getHour(), 30, 0),
        });
      }

      if (appState === 'background') {
        PushNotification.localNotificationSchedule({
          message:this.decideNotificationMessage(),
          date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), this.getHour(), 30, 0),
        });
      }
    }
  }

  getHour() {
    var today = new Date();
    if (today.getHours() < 21) {
      return 8;
    } else {
      return 22;
    }
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
