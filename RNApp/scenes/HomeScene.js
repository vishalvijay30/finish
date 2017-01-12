import React, { Component, PropTypes } from 'react';
import {View, StyleSheet, TouchableHighlight, Text, TouchableOpacity } from 'react-native';

import FBSDK from 'react-native-fbsdk';
import { loginWithTokens, onLoginFinished } from '../app/fb-login';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {meteorGoogleLogin, loginWithGoogle} from '../app/google-login';

import Meteor, { createContainer } from 'react-native-meteor';

import config from '../config';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        console.log("User " + this.props.user);

        if(!this.props.user) {
            return (
            <View style={styles.container}>
              <Text style={styles.welcome}>
                Welcome to FINISH!
            </Text>
                 <TouchableOpacity onPress={() => Meteor.logout()}>
                <Text>Logout of Google</Text>
            </TouchableOpacity>
                <GoogleSigninButton 
                style={{width: 312, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={this.googleSignIn.bind(this)}/>
                <LoginButton
                    readPermissions={["public_profile", "email"]}
                    onLoginFinished={onLoginFinished}
                    onLogoutFinished={() => Meteor.logout()}/>
            <TouchableHighlight onPress = { this.goToNextScene.bind(this) }>
                <Text> Next </Text>
            </TouchableHighlight>
            </View>
            );
        } else {
            return(
                <View>
                    <View style = {styles.topContainer}>
                        
                        <Text>
                            <TouchableOpacity style={{height:20,width:25}} onPress={this.goBack.bind(this)}><Icon name = "arrow-left" size = {20} color="#3399ff" /></TouchableOpacity>
                                <Text style = {{ fontSize:30, color:"#3399ff" }}> FINISH </Text> 
                            <TouchableOpacity style={{height:20,width:25}} onPress={this.goToNextScene.bind(this)}><Icon name = "plus" size = {20} color = "#3399ff"/></TouchableOpacity>
                        </Text>
                    </View>
                    <View style = {styles.middleContainer}>
                        <Text style = {{fontSize:35, color:"white"}}> Losers Have Goals. </Text>
                        <Text style = {{fontSize:35, color:"white"}}> Winners Have Habits. </Text>
                        <TouchableOpacity onPress={() => Meteor.logout()}>
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.bottomContainer}>
                        <Icon.Button name = "plus-square-o" size = {40} onPress = {this.goToNextScene.bind(this)}>
                            <Text style = {{fontSize:20, color:"white"}}> CREATE A HABIT </Text>
                        </Icon.Button>
                    </View>
                </View>
                
            );
        }
    }

    goBack() {
        this.props.navigator.pop();
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
    topContainer: {
        justifyContent:'center',
        alignItems:'center',
        height:50,
        //backgroundColor: '#e6ffff',
        backgroundColor: 'white',
    },
    middleContainer: {
        justifyContent:'center',
        alignItems:'center',
        height:550,
        backgroundColor: '#3399ff',
    },
    bottomContainer: {
        justifyContent:'center',
        alignItems:'center',
        height:75,
        backgroundColor:'#e6ffff',
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