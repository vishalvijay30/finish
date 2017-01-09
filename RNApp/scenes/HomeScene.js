import React, { Component, PropTypes } from 'react';
import {View, StyleSheet, TouchableHighlight, Text, TouchableOpacity } from 'react-native';

import FBSDK from 'react-native-fbsdk';
import { loginWithTokens, onLoginFinished } from '../app/fb-login';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {meteorGoogleLogin, loginWithGoogle} from '../app/google-login';

import Meteor, { createContainer } from 'react-native-meteor';

import config from '../config';

const { LoginButton, AccessToken } = FBSDK;
const SERVER_URL = 'ws://localhost:3000/websocket';

//import HomeStyles from '../styles/HomeStyles';
class HomeScene extends Component {

    constructor(props) {
    super(props);
    this.state = {count: 0};
    this.handleAddItem = this.handleAddItem.bind(this);

   }

   componentWillMount(){
        Meteor.connect(SERVER_URL);
        GoogleSignin.configure({
            iosClientId: config.google.iosClientId,
        });
        loginWithTokens();
        GoogleSignin.currentUserAsync()
        .then((user) => {
            meteorGoogleLogin(user);
        })
         .done();
   }
    handleAddItem() {
        Meteor.call('addHabit', { userId: this.props.user,  title: "Do something two", streak: 0 }, (err, res) => {
            console.log('addHabit', err, res);
            this.setState({count: this.props.db.length});
        });
        //check /**\

    }

    render() {
        console.log(this.props.user);
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
            <TouchableOpacity onPress={() => Meteor.logout()}>
                <Text>Logout of Google</Text>
            </TouchableOpacity>
            <LoginButton
                readPermissions={["public_profile", "email"]}
                onLoginFinished={onLoginFinished}
                onLogoutFinished={() => Meteor.logout()}/>
             <GoogleSigninButton 
                style={{width: 312, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={this.googleSignIn.bind(this)}/>
          <TouchableHighlight onPress = { this.goToNextScene.bind(this) }>
            <Text> Next </Text>
          </TouchableHighlight>
          </View>
        );
    }

    googleSignIn(){
        loginWithGoogle();
    }

    goToNextScene() {
        this.props.navigator.push( {screen : 'Scene2', user: this.props.user, db: this.props.db} );
    }
}
    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3399ff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color:'white',
    },
    instructions: {
        textAlign: 'center',
        marginBottom: 5,
        color:'white',
    },
    });

export default createContainer(() => {
  Meteor.subscribe('habits');
  return {
    //count: Meteor.collection('habits').find().length,
    user: Meteor.userId(),
    db: Meteor.collection('habits').find(),
  };
}, HomeScene);