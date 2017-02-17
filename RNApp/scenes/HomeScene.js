
import React, { Component, PropTypes } from 'react';

import {Dimensions, ScrollView, View, StyleSheet, TouchableHighlight, Text, TouchableOpacity, Image } from 'react-native';

import FBSDK from 'react-native-fbsdk';
import { loginWithTokens, onLoginFinished } from '../app/fb-login';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {meteorGoogleLogin, loginWithGoogle} from '../app/google-login';

import Meteor, { createContainer } from 'react-native-meteor';

import config from '../config';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/EvilIcons';

import RowComponent from '../app/components/rowComponent';
import Menu from '../app/components/sideMenu';

const SideMenu = require('react-native-side-menu');

const { LoginButton, AccessToken, LoginManager } = FBSDK;

const SERVER_URL = 'ws://localhost:3000/websocket';

//import HomeStyles from
 //'../styles/HomeStyles';
class HomeScene extends Component {


constructor(props){
        super(props);
        this.state = {
            goneToLogin: false,
            loggedIn: false,
            gotPic: false,
            picURL:''
        }

    }


   componentWillMount(){
        Meteor.connect(SERVER_URL);
        GoogleSignin.configure({
            iosClientId: config.google.iosClientId,
        });
   }

   componentDidMount(){
       //console.log(this.props.data);
        loginWithTokens((res) => {
            if (res){
                this.setState({loggedIn: true, goneToLogin:true, service:'facebook'});
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
               fetch('https://graph.facebook.com/543977359144002/picture?type=large')
               .then((response) => {
                   if (!this.state.picURL){
                        this.setState({gotPic: true, picURL:response.url});
                   }
               })
               .catch((error) => {
                   console.log(error);
                });
            }
   }

      render() {
          const menu = <Menu logout={this.handleLogout.bind(this)} picURL={this.state.picURL}/>

        //console.log(this.state.loggedIn + "" + this.state.goneToLogin);
        if (!this.props.user){
            return(<View style={styles.container}>
                        <Text style={{fontFamily:'Rock Salt', fontSize: 23, color:"white"}}> LOSERS HAVE GOALS </Text>
                        <Text style={{fontFamily:'Rock Salt', fontSize: 23, color:"white"}}> WINNERS HAVE HABITS </Text>
                        <Image source={require('../app/images/logo.png')} style={{width:200, height:200}} />
                        <Text style={{fontFamily:'Rock Salt', fontSize: 19, color:"white"}}> GET UP AND DO! </Text>
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
                        <Text style = {{ fontSize: (0.04 * Dimensions.get('window').height), color:"white", alignSelf:'center', fontFamily:"Rock Salt", flex: 1, textAlign:'center', fontWeight:'bold' }}> FINISH </Text>
                    </View>
                middleContainer =
                    <View style = {styles.middleContainer}>
                        <Text style = {{fontSize:25, color:"white", fontFamily:"Rock Salt"}}> Losers Have Goals. </Text>
                        <Text style = {{fontSize:25, color:"white", fontFamily:"Rock Salt"}}> Winners Have Habits. </Text>
                    </View>

                bottomContainer =
                    <View style = {styles.bottomContainer}>
                        <Icon.Button name = "plus-square-o" size = {60} onPress = {this.goToNextScene.bind(this)}>

                            <Text style = {{fontSize:35, color:"white"}}> CREATE A HABIT </Text>

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
                            <TouchableOpacity />
                            <Text style = {{ fontSize:30, color:"#3399ff", paddingLeft:30}}> FINISH </Text>
                            <TouchableOpacity style={{height:20,width:25, paddingTop:7}} onPress={this.goToNextScene.bind(this)}><Icon name = "plus" size = {20} color = "#3399ff"/></TouchableOpacity>
                    </View>
                middleContainer =
                       
                    <View style = {styles.middleContainer}>
  
                        <ScrollView>
                            {arr.map((habit_pair) => {
                                return <RowComponent  navigator = {this.props.navigator} habit_pair={habit_pair}/>
                            })}
                        </ScrollView>
                    </View>

                    bottomContainer =  <View style = {styles.bottomContainer} >
                        <Icon.Button name = "plus-square-o" size = {60} onPress = {this.goToNextScene.bind(this)}>

                            <Text style = {{fontSize:35, color:"white"}}> CREATE </Text>

                        </Icon.Button>
                    </View>

                
            }
            return(
                <SideMenu menu = {menu} >
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
            this.props.navigator.push({screen:'LoginScene'});
            this.setState({goneToLogin: true, loggedIn: true});
        }
    }


    handleLogout(){
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
        //backgroundColor:'green',
        paddingBottom: 10,
        paddingTop: 30,
        paddingRight: 10,
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
        //backgroundColor:'red',
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
    Meteor.call('refreshList', null, (err, res) => {
            Meteor.subscribe('habits');
    });
    return {
        user: Meteor.userId(),
        data: Meteor.user(),
        db: Meteor.collection('habits').find(),
    };
}, HomeScene);
