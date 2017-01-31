import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Meteor from 'react-native-meteor';
import CountdownTimer from 'react-native-countdown-timer';
var moment = require('moment');
import TimeLabel from '../app/components/timeLabel';

export default class Scene5 extends Component {
    constructor(props){
        super(props);
        var mom = moment().add('1', 'day').format('MM/DD/YYYY');;

        var date = new Date(mom + " " + "00:00:00")

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
            emoji = <Icon name="frown-o" size={50} color="#D71F3E" />
        } else {
            emoji = <Icon name="smile-o" size={50} color="#12DD49" />
        }

        return (
            <View>
                <View style = {styles.topContainer}>
                <Text></Text>
                    <TouchableOpacity style={{height:20,width:25}} onPress={this.goBack.bind(this)}><Icon name = "arrow-left" size = {20} color="#3399ff" /></TouchableOpacity>
                    <Text style = {{ fontSize:30, color:"#3399ff" }}> FINISH </Text>
                    <Text></Text>
                </View>

                <View style = {styles.middleContainer}>
                    <Text style={{fontSize:30}}> {this.props.habit.title} </Text>

                    <Text></Text>
                     <CountdownTimer
                        till={this.state.date}
                        renderTick={(data) => <TimeLabel {...data} />}
                        onTick={this._onTick.bind(this)}
                        onFinish={this._onFinish.bind(this)}
                    />
                    <Text></Text>
                    <Text style = {{fontSize:20}}>Max streak: {this.props.habit.max}</Text>
                    <TouchableOpacity onPress={this.toggleEmojiState}>
                        {emoji}
                    </TouchableOpacity>

                </View>
                <View style = {styles.bottomContainer}>
                    <Icon.Button name = "plus-square-o" size = {40} onPress = {this.removeHabit.bind(this)}>
                            <Text style = {{fontSize:20, color:"white"}}> Delete Habit </Text>
                    </Icon.Button>
                </View>
            </View>
        );
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
    topContainer: {
        justifyContent:'center',
        alignItems:'center',
        height:50,
        backgroundColor: '#48C9B0',
    },
    middleContainer: {
        justifyContent:'center',
        alignItems:'center',
        height:500,
        backgroundColor: '#48C9B0',
    },
    bottomContainer: {
        justifyContent:'center',
        alignItems:'center',
        height:75,
        backgroundColor:'#48C9B0',
    },
    fillerContainer: {
        backgroundColor:'#008080',
        height:50,
    }

});