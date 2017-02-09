import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Meteor from 'react-native-meteor';
import CountdownTimer from 'react-native-countdown-timer';
var moment = require('moment');
import TimeLabel from '../app/components/timeLabel';

export default class Scene5 extends Component {
    constructor(props){
        super(props);
        var mom = moment().add('1', 'day').format('MM/DD/YYYY');

        var date = new Date(mom + " " + "00:00:00");

        //this.state = {emojiState: this.props.habit.completed};
        console.log(this.props.habit);
        this.state = {emojiState: this.props.habit.completed, date: date};
        this.toggleEmojiState = this.toggleEmojiState.bind(this);
        this.goBack = this.goBack.bind(this);
    }

     _onTick() {
        console.log(`_onTick`)
    }

    _onFinish() {
        console.log(`_onFinish`)
    }

    render() {
        let emoji = null;
        if (this.state.emojiState==false) {
            emoji = <Icon name="frown-o" size={80} color="#D71F3E" />
        } else {
            emoji = <Icon name="smile-o" size={80} color="#1BA541" />
        }

        return (
            <View style={{flex:1}}>
                <View style = {styles.topContainer}>
                <Text></Text>
                    <TouchableOpacity style={{paddingLeft:10}} onPress={this.goBack.bind(this)}><Icon name = "arrow-left" size = {40} color="white" /></TouchableOpacity>
                    <Text style = {{ fontSize:30, color:"white", flex: 1, fontFamily: "Rock Salt", alignText:'center', }}> FINISH </Text>
                </View>

                <View style = {styles.middleContainer}>
                    <Text style={{fontSize:30, fontFamily:"Permanent Marker", color:"white", align:"center"}}> {this.props.habit.title} </Text>
                    <Text></Text>
                     <CountdownTimer
                        till={this.state.date}
                        renderTick={(data) => <TimeLabel {...data} color = {this.decideColorOfTimer()} habit= {this.props.habit}/>}
                        onTick={this._onTick.bind(this)}
                        onFinish={this._onFinish.bind(this)}
                        />
                    <Text></Text>
                    <View><Icon2 name ="ios-flame" size={30} color="red"><Text style={{color:"white", fontFamily:"Impact"}}> {this.props.habit.streak}</Text></Icon2></View>
                    <Text></Text>
                    <View><Icon name ="star" size={30} color="yellow"><Text style={{color:"white", fontFamily:"Impact"}}> {this.props.habit.max}</Text></Icon></View>
                    <Text></Text>
                    <TouchableOpacity onPress={this.toggleEmojiState}>
                        {emoji}
                    </TouchableOpacity>

                </View>
                <View style = {styles.bottomContainer}>
                    <TouchableOpacity onPress = {this.removeHabit.bind(this)}>
                        <Icon name = "minus-circle" size={50} color = "white" /><Text style={{flex:1, fontSize:15, color:"white"}}>DELETE HABIT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    decideColorOfTimer() {
    if(this.props.habit.completed) {
        return "#1BA541";
    } else {
        return "#D71F3E";
    }
  }

    goBack() {
        this.props.navigator.pop();
    }

    removeHabit(){
        Meteor.call('removeHabit', {habit: this.props.habit});
        this.goBack();
    }

    toggleEmojiState() {
        if (!this.state.emojiState){
            Meteor.call('updateStreak', {habit: this.props.habit}, (err, res) => {
                this.setState({emojiState:true});
                this.props.navigator.pop();
            });
        }
    }
}

const styles = StyleSheet.create({
    // topContainer: {
    //     justifyContent:'center',
    //     alignItems:'center',
    //     height:50,
    //     backgroundColor: '#48C9B0',
    // },
    // middleContainer: {
    //     justifyContent:'center',
    //     alignItems:'center',
    //     height:500,
    //     backgroundColor: '#48C9B0',
    // },
    // bottomContainer: {
    //     justifyContent:'center',
    //     alignItems:'center',
    //     height:125,
    //     backgroundColor:'#48C9B0',
    // },
    topContainer : {
        backgroundColor: "#48C9B0",
        //backgroundColor:'green',
        paddingBottom: 10,
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    middleContainer: {
        backgroundColor: "#48C9B0",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomContainer: {
        //backgroundColor: "#48C9B0",
        backgroundColor:'red',
        flexDirection: 'row',
        //alignItems:'center',
        //justifyContent:'center',
        //width:Dimensions.get('window').width,
    },

});