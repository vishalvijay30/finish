import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator
} from 'react-native';


import {loginWithTokens, onLoginFinished} from './fb-login';

import TestScene from '../scenes/TestScene';
import HomeScene from '../scenes/HomeScene';
import Scene2 from '../scenes/Scene2';
import Scene3 from '../scenes/Scene3';
import Scene4 from '../scenes/Scene4';
import Scene5 from '../scenes/Scene5';


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
          />

    );
  }
  renderScene (route, nav) {
    switch (route.screen) {
      case "HomeScene":
        return <HomeScene navigator = { nav } />
      case "TestScene":
        return <TestScene navigator = { nav } />
      case "Scene2":
        return <Scene2 navigator = { nav } user = {route.user} db={route.db} />
      case "Scene3":
        return <Scene3 navigator = { nav } user = {route.user} db={route.db} />
      case "Scene4":
        return <Scene4 navigator = { nav } user = {route.user} db={route.db}/>
      case "Scene5":
        return <Scene5 navigator = { nav } user = {route.user} habit={route.document} />
    }
  }
};

