import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Meteor, { createContainer } from 'react-native-meteor';

import {loginWithTokens, onLoginFinished} from './fb-login';

import FBSDK from 'react-native-fbsdk';
const { LoginButton, AccessToken } = FBSDK;

const SERVER_URL = 'ws://localhost:3000/websocket';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {count: 0};
    this.handleAddItem = this.handleAddItem.bind(this);

  }

  componentWillMount() {
    Meteor.connect(SERVER_URL);
    loginWithTokens();
  }

  handleAddItem() {
    Meteor.call('addHabit', { userId: this.props.user._id,  title: "Do something two", streak: 0 }, (err, res) => {
      console.log('addHabit', err, res);
    });
    this.setState({count: this.db.length});
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
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native + Meteor!
        </Text>
        <Text style={styles.instructions}>
          Item Count: {this.state.count}
        </Text>

        <TouchableOpacity style={styles.button} onPress={this.handleAddItem}>
          <Text>Add Item</Text>
          <Text>{this.state.userId}</Text>
        </TouchableOpacity>
         <LoginButton
          readPermissions={["public_profile", "email"]}
          onLoginFinished={onLoginFinished}
          onLogoutFinished={() => Meteor.logout()}/>
      </View>
      
    );
  }
};

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
});

export default createContainer(() => {
  Meteor.subscribe('habits');
  return {
    user: Meteor.user(),
    db: Meteor.collection('habits').find(),
  };
}, App);