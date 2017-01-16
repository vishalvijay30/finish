import React, { Component, PropTypes } from 'react';
import {View, StyleSheet, TouchableHighlight, Text, TouchableOpacity, ScrollView } from 'react-native';

import FBSDK from 'react-native-fbsdk';

import { loginWithTokens, onLoginFinished } from '../app/fb-login';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {meteorGoogleLogin, loginWithGoogle} from '../app/google-login';

import Meteor, { createContainer } from 'react-native-meteor';

const { LoginButton, AccessToken, LoginManager } = FBSDK;

//import HomeStyles from '../styles/HomeStyles';
export default class LoginScene extends Component {

    render() {
            return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Finish! Register to get started.
                </Text>
                
                <LoginButton
                    readPermissions={["public_profile", "email"]}
                    onLoginFinished={this.handleLogin.bind(this)}
                    onLogoutFinished={() => this.handleLogout()}/>
                    <GoogleSigninButton 
                style={{width: 312, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={this.googleSignIn.bind(this)}/>
            </View>
            );
    }

    handleLogout(){
        console.log("reached logout method");
        LoginManager.logOut();
        Meteor.logout();
        GoogleSignin.signOut();
        this.setState({loggedIn: false, goneToLogin: false});
    }

    handleLogin(error, result){
        console.log("handle login");
        onLoginFinished(error, result);
        this.props.navigator.pop();
    }
     googleSignIn(){
        loginWithGoogle();
        this.props.navigator.pop();
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
 