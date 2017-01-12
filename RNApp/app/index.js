import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator
} from 'react-native';


import {loginWithTokens, onLoginFinished} from './fb-login';

import HomeScene from '../scenes/HomeScene';
import LoginScene from '../scenes/LoginScene';
import Scene3 from '../scenes/Scene3';
import Scene5 from '../scenes/Scene5';

import Meteor from 'react-native-meteor';
//import CombinedScene from '../scenes/CombinedScene';


export default class App extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {count: 0};
  //   this.handleAddItem = this.handleAddItem.bind(this);

  //  }




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
<<<<<<< HEAD
        return <HomeScene navigator = { nav } />
      case "LoginScene":
        return <LoginScene navigator = { nav } />
=======
        return <HomeScene navigator = { nav }/>
      case "TestScene":
        return <TestScene navigator = { nav } />
      case "Scene2":
        return <Scene2 navigator = { nav } user = {route.user} db={route.db} />
>>>>>>> uidev
      case "Scene3":
        return <Scene3 navigator = { nav } user = {route.user} db={route.db} />
      case "Scene5":
        return <Scene5 navigator = { nav } user = {route.user} habit={route.document} />
    }
  }
};

