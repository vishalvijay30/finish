import React, { Component, PropTypes } from 'react';
import {View, StyleSheet, TouchableHighlight, Text, TouchableOpacity, ScrollView } from 'react-native';
var moment = require('moment');

import CircleComponent from './circleComponent';
import TimeLabel from './timeLabel';
import CountdownTimer from 'react-native-countdown-timer';

export default class BoxComponent extends Component{

    constructor(props){
        super(props);
        var mom = moment().add('1', 'day').format('MM/DD/YYYY');;
        var date = new Date(mom + " " + "00:00:00");
        this.state = {date: date};
        
    }

     _onTick() {
        console.log(`_onTick`)
    }

    _onFinish() {
        console.log(`_onFinish`)
    }

    decideColorOfTimer() {
        if(this.props.habit.completed) {
            return "#1BA541";
        } else {
            return "#D71F3E";
        }
    }

    render() {
        if (!this.props.habit){
            return (<View/>)
        } else {
        console.log(this.props.habit_pair);
        return(<View style={{alignItems:'center'}}>
                        <CircleComponent navigator = {this.props.navigator} habit={this.props.habit} />
                         <CountdownTimer
                        till={this.state.date}
                        renderTick={(data) => <TimeLabel {...data} color = {this.decideColorOfTimer()} />}
                        onTick={this._onTick.bind(this)}
                        onFinish={this._onFinish.bind(this)}
                        />
                </View>
            );
        }
    }
}