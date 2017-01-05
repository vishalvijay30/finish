import React, { Component, PropTypes } from 'react';
import {View, StyleSheet, TouchableHighlight, Text, TouchableOpacity } from 'react-native';

import Meteor, { createContainer } from 'react-native-meteor';

import FBSDK from 'react-native-fbsdk';
const { LoginButton, AccessToken } = FBSDK;

//import HomeStyles from '../styles/HomeStyles';
export default class HomeScene extends Component {
    handleAddItem() {
    Meteor.call('addHabit', { userId: null,  title: "Do something", streak: 0 }, (err, res) => {
      /* user id is null for now, eventually adding will be done in separate component with userid as prop */
      console.log('addHabit', err, res);
    });
    }

    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.welcome}>
                Welcome to React Native + Meteor!
            </Text>
            <Text style={styles.instructions}>
                Item Count: {this.props.count}
            </Text>

            <TouchableOpacity style={styles.button} onPress={this.handleAddItem}>
                <Text>Add Item</Text>
            </TouchableOpacity>
            <LoginButton
                readPermissions={["public_profile", "email"]}
                onLoginFinished={
                    (error, result) => {
                    if (error) {
                        alert("login has error: " + result.error);
                    } else if (result.isCancelled) {
                        alert("login is cancelled.");
                    } else {
                        AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            console.log(data.userId);
                    /*     USER ID IS STORED HERE, MUST BE PASSED AS PROP TO ALL OTHER COMPONENTS     */
                    }
                )
              }
            }
          }
          onLogoutFinished={() => Meteor.logout()}/>
          <TouchableHighlight onPress = { this.goToNextScene.bind(this) }>
            <Text> Next </Text>
          </TouchableHighlight>
          </View>
        );
    }

    goToNextScene() {
        this.props.navigator.push( {screen : 'Scene2'} );
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
        color: '#333333',
        marginBottom: 5,
        color:'white',
    },
    });

