import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator
} from 'react-native';

import Meteor, { createContainer } from 'react-native-meteor';

import {loginWithTokens, onLoginFinished} from './fb-login';

import FBSDK from 'react-native-fbsdk';

import TestScene from '../scenes/TestScene';
import HomeScene from '../scenes/HomeScene';
import Scene2 from '../scenes/Scene2';
import Scene3 from '../scenes/Scene3';
import Scene4 from '../scenes/Scene4';
import Scene5 from '../scenes/Scene5';

const { LoginButton, AccessToken } = FBSDK;

const SERVER_URL = 'ws://localhost:3000/websocket';

class App extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {count: 0};
  //   this.handleAddItem = this.handleAddItem.bind(this);

  //  }

  componentWillMount() {
    Meteor.connect(SERVER_URL);
    loginWithTokens();
  }




  render() {
    const {user, db} = this.props;
    if (user){
    console.log(user._id);
    } else {console.log('user not logged in');}
    if (db){
      console.log(db);
    } else {
      console.log('cannot fetch data');
    }
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
        return <HomeScene navigator = { nav } count = { this.props.count } user = {this.props.user} db={this.props.db}/>
      case "TestScene":
        return <TestScene navigator = { nav } />
      case "Scene2":
        return <Scene2 navigator = { nav } user = {this.props.user} db={this.props.db} />
      case "Scene3":
        return <Scene3 navigator = { nav } user = {this.props.user} db={this.props.db} />
      case "Scene4":
        return <Scene4 navigator = { nav } user = {this.props.user} db={this.props.db} />
      case "Scene5":
        return <Scene5 navigator = { nav } user = {this.props.user} db={this.props.db} />
    }
  }
};

export default createContainer(() => {
  Meteor.subscribe('habits');
  return {
    //count: Meteor.collection('habits').find().length,
    user: Meteor.user(),
    db: Meteor.collection('habits').find(),
  };
}, App);