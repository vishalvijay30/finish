
import React, { Component, PropTypes } from 'react';

import {ScrollView, View, StyleSheet, TouchableHighlight, Text, TouchableOpacity, Image } from 'react-native';

import FBSDK from 'react-native-fbsdk';
import { loginWithTokens, onLoginFinished } from '../app/fb-login';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {meteorGoogleLogin, loginWithGoogle} from '../app/google-login';

import Meteor, { createContainer } from 'react-native-meteor';

import config from '../config';
import Icon from 'react-native-vector-icons/FontAwesome';

import RowComponent from '../app/components/rowComponent';

const { LoginButton, AccessToken, LoginManager } = FBSDK;

const SERVER_URL = 'ws://finishgetupanddo.herokuapp.com/websocket';

//import HomeStyles from
 //'../styles/HomeStyles';
class HomeScene extends Component {


constructor(props){
        super(props);
        this.state = {
            goneToLogin: false,
            loggedIn: false,
        }
    }


   componentWillMount(){
        Meteor.connect(SERVER_URL);
        GoogleSignin.configure({
            iosClientId: config.google.iosClientId,
        });
   }

   componentDidMount(){
        loginWithTokens((res) => {
            if (res){
                this.setState({loggedIn: true});
            }
        });
        GoogleSignin.currentUserAsync()
            .then((user) => {if (user){
                this.setState({loggedIn : true, goneToLogin: true});
                meteorGoogleLogin(user);
            }}).done();

   }

    componentDidUpdate() {
        setTimeout(() => this.checkAndGoToLoginScene(), 2000);
   }

      render() {
        //console.log("User " + this.props.user);
       // console.log(this.props.db);
        //console.log(this.state.loggedIn + "" + this.state.goneToLogin);
        if (!this.props.user){
            return(<View style={styles.container}>
                <Image source={require('../app/images/logo.png')} style={{width:200, height:200}} />
            </View>);

        } else {
            topContainer = null;
            middleContainer = null;
            bottomContainer = null;
            if (this.props.db.length == 0){
                topContainer =
                    <View style = {styles.topContainer}>
                        <Text style = {{ fontSize:30, color:"#3399ff" }}> FINISH </Text>
                    </View>
                middleContainer =
                    <View style = {styles.middleContainer}>
                        <Text style = {{fontSize:35, color:"white"}}> Losers Have Goals. </Text>
                        <Text style = {{fontSize:35, color:"white"}}> Winners Have Habits. </Text>
                        <TouchableOpacity onPress={() => this.handleLogout()}>
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>

                bottomContainer =
                    <View style = {styles.bottomContainer}>
                        <Icon.Button name = "plus-square-o" size = {40} onPress = {this.goToNextScene.bind(this)}>
                            <Text style = {{fontSize:20, color:"white"}}> Create a Habit </Text>
                        </Icon.Button>
                    </View>
            } else {
                var i;
                var arr = [];
                for (i = 0; i < this.props.db.length; i++){
                    if (i%2==1)continue;
                    arr.push([this.props.db[i], this.props.db[i+1]]);
                }

               topContainer =
                    <View style = {styles.topContainer}>
                            <Text style = {{ fontSize:30, color:"#3399ff" }}> FINISH </Text>
                            <TouchableOpacity style={{height:20,width:25}} onPress={this.goToNextScene.bind(this)}><Icon name = "plus" size = {20} color = "#3399ff"/></TouchableOpacity>
                    </View>
                middleContainer =
                    <View style = {styles.middleContainer}>
                        <Text style ={{fontSize:30}}> Habits List </Text>
                        <ScrollView>
                            {arr.map((habit_pair) => {
                                console.log(habit_pair);
                                return <RowComponent  navigator = {this.props.navigator} habit_pair={habit_pair} />
                            })}
                        </ScrollView>
                    </View>

                bottomContainer =
                <View style = {styles.bottomContainer}>
                    <TouchableOpacity onPress={() => this.handleLogout()}>
                            <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            }
            return(
                <View>
                    {topContainer}
                    {middleContainer}
                    {bottomContainer}
                </View>

            );
        }
    }
    checkAndGoToLoginScene(){
        if(this.props.user===null && !this.state.goneToLogin){
            console.log("in gotologin method");
            this.props.navigator.push({screen:'LoginScene'});
            this.setState({goneToLogin: true, loggedIn: true});
        }
    }


    handleLogout(){
        console.log("reached logout method");
        LoginManager.logOut();
        Meteor.logout();
        GoogleSignin.signOut();
        this.setState({loggedIn: false, goneToLogin: false});
    }

    goToNextScene() {
        this.props.navigator.push( {screen : 'Scene3', user: this.props.user, db: this.props.db} );
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
    Meteor.call('refreshList', null, (err, res) => {
            Meteor.subscribe('habits');
    });
    return {
        user: Meteor.userId(),
        db: Meteor.collection('habits').find(),
    };
}, HomeScene);
