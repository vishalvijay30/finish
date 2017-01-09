/**
import React, { Component, PropTypes } from 'react';
import {ScrollView, View, StyleSheet, TouchableHighlight, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

import FBSDK from 'react-native-fbsdk';

import { loginWithTokens, onLoginFinished } from '../app/fb-login';

import Meteor, { createContainer } from 'react-native-meteor';
const { LoginButton, AccessToken } = FBSDK;
const SERVER_URL = 'ws://localhost:3000/websocket';

//import HomeStyles from '../styles/HomeStyles';
class HomeScene extends Component {

    constructor(props) {
    super(props);
    this.state = {count: 0};
    this.handleAddItem = this.handleAddItem.bind(this);
    this.goToNextScene = this.goToNextScene.bind(this);

   }

   componentWillMount(){
        Meteor.connect(SERVER_URL);
        loginWithTokens();
   }
    handleAddItem() {
        Meteor.call('addHabit', { userId: this.props.user,  title: "Do something two", streak: 0 }, (err, res) => {
            console.log('addHabit', err, res);
            this.setState({count: this.props.db.length});
        });


    }

    render() {
        console.log("xyz");
        if (!this.props.user) {
            console.log("gorrila");
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
                <TouchableHighlight onPress={this.goToNextScene.bind(this)}>
                    <Text>Next</Text>
                </TouchableHighlight>
          </View>

            );

        } else {
            console.log("executing else");
        return (
            <View>
                <View style = {styles.topContainer}>
                    <Text>
                         <TouchableOpacity style={{height:20,width:25}} onPress={this.goHome.bind(this)}><Icon name = "arrow-left" size = {20} color="#3399ff" /></TouchableOpacity>
                            <Text style = {{ fontSize:30, color:"#3399ff" }}> FINISH </Text>
                        <TouchableOpacity style={{height:20,width:25}} onPress={this.goToNextScene.bind(this)}><Icon name = "plus" size = {20} color = "#3399ff"/></TouchableOpacity>
                     </Text>
                </View>
                <View style = {styles.middleContainer}>
                    <Text style = {{fontSize:35, color:"white"}}> Losers Have Goals. </Text>
                    <Text style = {{fontSize:35, color:"white"}}> Winners Have Habits. </Text>
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

    goToNextScene() {
        if (this.props.db.length==0) {
            this.props.navigator.push( {screen : 'Scene2', user: this.props.user, db: this.props.db} );
        } else {
            this.props.navigator.push( {screen: 'Scene4', user: this.props.user, db: this.props.db} );
        }

    }

    goToScene3() {
        this.props.navigator.push({screen:'Scene3', user:this.props.user, db:this.props.db});
    }

    goHome() {
        this.props.navigator.push({screen:'HomeScene', user:this.props.user, db:this.props.db});
    }
}
    const styles = StyleSheet.create({
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
**/
import React, { Component, PropTypes } from 'react';
import {View, StyleSheet, TouchableHighlight, Text, TouchableOpacity } from 'react-native';

import FBSDK from 'react-native-fbsdk';

import { loginWithTokens, onLoginFinished } from '../app/fb-login';

import Meteor, { createContainer } from 'react-native-meteor';

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
        loginWithTokens();
   }
    handleAddItem() {
        Meteor.call('addHabit', { userId: this.props.user,  title: "Do something two", streak: 0 }, (err, res) => {
            console.log('addHabit', err, res);
            this.setState({count: this.props.db.length});
        });
        //check /**\

    }

    render() {
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

    goBack() {
        this.props.navigator.pop();
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
        backgroundColor: '#008080',
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