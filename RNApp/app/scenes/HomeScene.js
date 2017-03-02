
import React, { Component, PropTypes } from 'react';

import {Dimensions, ScrollView, View, StyleSheet, TouchableHighlight, Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';

import FBSDK from 'react-native-fbsdk';
import { loginWithTokens, onLoginFinished } from '../oauth/fb-login';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {meteorGoogleLogin, loginWithGoogle} from '../oauth/google-login';

import Meteor, { createContainer } from 'react-native-meteor';

import config from '../config';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/EvilIcons';

import RowComponent from '../components/rowComponent';
import Menu from '../components/sideMenu';

const SideMenu = require('react-native-side-menu');

const { LoginButton, AccessToken, LoginManager } = FBSDK;

var moment = require('moment');

const SERVER_URL = 'ws://finishgetupanddo.herokuapp.com/websocket';

//import HomeStyles from
 //'../styles/HomeStyles';
class HomeScene extends Component {


constructor(props){
        super(props);
        this.state = {
            goneToLogin: false,
            loggedIn: false,
            gotPic: false,
            fbUserId: '',
            picURL:''
        }

    }


   componentWillMount(){
        Meteor.connect(SERVER_URL);
        GoogleSignin.configure({
            iosClientId: config.google.iosClientId,
        });
        if (!this.state.picURL){
          AsyncStorage.getItem('GOOGLE_PHOTO').then((value) => {
            if (value){
              this.setState({loggedIn : true, goneToLogin: true, gotPic: true, picURL:user.photo});
            }
          });
        }

   }

   componentDidMount(){
       //console.log(this.props.data);
        loginWithTokens((res) => {
            if (res){
                this.setState({loggedIn: true, goneToLogin:true, service:'facebook'});
                AsyncStorage.getItem('FACEBOOK_ID').then((value) => {
                  console.log(value);
                  this.setState({fbUserId: value});
                  console.log(this.state);
                });
            }
        });
        GoogleSignin.currentUserAsync()
            .then((user) => {if (user){
                this.setState({loggedIn : true, goneToLogin: true, gotPic: true, picURL:user.photo});
                meteorGoogleLogin(user);
            }}).done();

   }

    componentDidUpdate() {
         setTimeout(() => this.checkAndGoToLoginScene(), 4000);

            if (this.props.user && !this.state.gotPic){
              AsyncStorage.getItem('FACEBOOK_ID').then((value) => {
                if (value){
                  this.setState({fbUserId: value});
                  console.log(this.state);
                  fetch('https://graph.facebook.com/'+this.state.fbUserId+'/picture?type=large')
                  .then((response) => {
                      if (!this.state.picURL){
                           this.setState({gotPic: true, picURL:response.url});
                      }
                  })
                  .catch((error) => {
                      console.log(error);
                   });
                }
              });

            }
            var i;

            const millisInDay = 86400000;
            var toBeReset = [];
            var toBeToggled = [];
            var midnight = moment().startOf('day').valueOf();
            if (this.props.db){
              for (i = 0; i < this.props.db.length; i++){
                //console.log(this.props.db[i].title + " " + midnight + " " + this.props.db[i].lastCompleted + " " + millisInDay);
                if (midnight - this.props.db[i].lastCompleted > millisInDay){
                  toBeReset.push(this.props.db[i]._id);
                } else if(midnight > this.props.db[i].lastCompleted){
                  toBeToggled.push(this.props.db[i]._id);
                }
                Meteor.call("modifyHabits", {toggled: toBeToggled, reset: toBeReset});

              }
            }
   }
   toggleSideMenu() {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }

    updateMenuState(isOpen) {
      this.setState({ isOpen, });
    }

      render() {
        //console.log(this.props.db);
        //console.log(this.props.data);
          const menu = <Menu logout={this.handleLogout.bind(this)} picURL={this.state.picURL} data={this.props.data}/>

        //console.log(this.state.loggedIn + "" + this.state.goneToLogin);
        if (!this.props.user){
            return(<View style={styles.container}>
                <Text style={{fontFamily:'Permanent Marker', fontSize: 25, color:"white"}}> LOSERS HAVE GOALS </Text>
                <Text style={{fontFamily:'Permanent Marker', fontSize: 25, color:"white"}}> WINNERS HAVE HABITS </Text>
                <Image source={require('../images/logo.png')} style={{width:200, height:200}} />
                <Text style={{fontFamily:'Permanent Marker', fontSize: 19, color:"white"}}> GET UP AND DO! </Text>
                <Icon2 name = "spinner-3" size={80} color="grey" />
                <TouchableOpacity onPress={() => this.handleLogout()}><Text>Logout</Text></TouchableOpacity>
            </View>);

        } else {
            topContainer = null;
            middleContainer = null;
            bottomContainer = null;
            if (this.props.db.length == 0){
                topContainer =
                    <View style = {styles.topContainer}>
                        <TouchableOpacity style={{paddingLeft:10}} onPress={this.toggleSideMenu.bind(this)}><Icon name = "ios-list" size = {60} color="white" /></TouchableOpacity>
                        <Text style = {{ fontSize: (0.04 * Dimensions.get('window').height), color:"white", fontFamily:"Rock Salt", flex: 1, textAlign:'center', fontWeight:'bold' }}> FINISH </Text>
                    </View>
                middleContainer =
                    <View style = {styles.middleContainer}>
                        <Text style = {{fontSize:30, color:"white", fontFamily:"Permanent Marker"}}> Losers Have Goals. </Text>
                        <Text style = {{fontSize:30, color:"white", fontFamily:"Permanent Marker"}}> Winners Have Habits. </Text>
                        <TouchableOpacity onPress={() => this.handleLogout()}>
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>

                bottomContainer =
                    <View style = {styles.bottomContainer}>
                        <Icon.Button style = {{width: Dimensions.get('window').width}} name = "ios-add-circle-outline" size = {60} onPress = {this.goToNextScene.bind(this)}>

                            <Text style = {{fontSize:40, color:"white"}}> CREATE A HABIT </Text>

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
                        <TouchableOpacity style={{paddingLeft:10}} onPress={this.toggleSideMenu.bind(this)}><Icon name = "ios-list" size = {60} color="white" /></TouchableOpacity>
                        <Text style = {{ fontSize:30, color:"white", fontFamily:"Rock Salt", textAlign: 'center', flex:1 }}> FINISH </Text>
                        <TouchableOpacity style={{paddingRight:10}} onPress={this.goToNextScene.bind(this)}><Icon name = "ios-add" size = {60} color="white" /></TouchableOpacity>
                    </View>
                middleContainer =

                    <View style = {styles.middleContainer}>

                        <ScrollView>
                            {arr.map((habit_pair) => {
                                return <RowComponent  navigator = {this.props.navigator} habit_pair={habit_pair}/>
                            })}
                        </ScrollView>
                    </View>
            }
            return(
                <SideMenu menu = {menu} isOpen={this.state.isOpen} onChange={(isOpen) => this.updateMenuState(isOpen)}>
                    <View style = {{flex: 1}}>
                        {topContainer}
                        {middleContainer}
                        {bottomContainer}
                    </View>
                </SideMenu>

            );
        }
    }
    checkAndGoToLoginScene(){

        if(this.props.user===null && !this.state.goneToLogin){
          this.setState({goneToLogin: true, loggedIn: true});

            this.props.navigator.immediatelyResetRouteStack([{screen:'LoginScene'}]);
        }
    }


    handleLogout(){
      LoginManager.logOut();
      Meteor.logout();
      GoogleSignin.signOut();
      this.setState({loggedIn: false, goneToLogin: false, gotPic: false, picURL: null, fbUserId: null});
      AsyncStorage.removeItem('FACEBOOK_ID');
      AsyncStorage.removeItem('GOOGLE_PHOTO');
    }

    goToNextScene() {
        this.props.navigator.push( {screen : 'Scene3', user: this.props.user, db: this.props.db} );
    }


}
     const styles = StyleSheet.create({

    // topContainer: {
    //     justifyContent:'center',
    //     alignItems:'center',
    //     //height:75,
    //     backgroundColor: '#48C9B0',
    //     paddingTop:10,
    //     //paddingBottom:10,
    //     flexDirection:'row',
    // },
    // middleContainer: {
    //     justifyContent:'center',
    //     alignItems:'center',
    //     height:525,
    //     backgroundColor: '#48C9B0',
    // },
    // bottomContainer: {
    //     justifyContent:'center',
    //     alignItems:'center',
    //     //height:75,
    //     width:Dimensions.get('window').width,
    //     backgroundColor:'#48C9B0',
    //     //flexDirection:'row',
    //     //flex: 1,
    // },
    topContainer : {
        backgroundColor: "#48C9B0",

        //backgroundColor:'#008080',
        //paddingBottom: 10,
        paddingTop: 10,
        flexDirection: 'row',
        //alignItems: 'center',
        justifyContent: 'space-between',
    },
    middleContainer: {
        backgroundColor: "#48C9B0",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomContainer: {
        backgroundColor: "#48C9B0",
        //backgroundColor:'#008080',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#48C9B0',
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
        user: Meteor.userId(),
        data: Meteor.user(),
        db: Meteor.collection('habits').find(),
    };
}, HomeScene);
