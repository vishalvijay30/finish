import React, { Component, PropTypes } from 'react';
import {View, StyleSheet, TouchableHighlight, Text, TouchableOpacity } from 'react-native';

import Meteor from 'react-native-meteor';

import FBSDK from 'react-native-fbsdk';

import { onLoginFinished } from '../app/fb-login';

const { LoginButton, AccessToken } = FBSDK;

//import HomeStyles from '../styles/HomeStyles';
export default class HomeScene extends Component {

    constructor(props) {
    super(props);
    this.state = {count: 0};
    this.handleAddItem = this.handleAddItem.bind(this);

   }
    handleAddItem() {
    Meteor.call('addHabit', { userId: this.props.user._id,  title: "Do something two", streak: 0 }, (err, res) => {
      console.log('addHabit', err, res);
    });
    //check /**\
    this.setState({count: this.props.db.length});

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

