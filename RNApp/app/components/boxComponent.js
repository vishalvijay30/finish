import React, { Component, PropTypes } from 'react';
import {View, StyleSheet, TouchableHighlight, Text, TouchableOpacity, ScrollView } from 'react-native';
var moment = require('moment');

import CircleComponent from './circleComponent';
import TimeLabel from './timeLabel';
import CountdownTimer from 'react-native-countdown-timer';

export default class BoxComponent extends Component{

     _onTick() {
        console.log(`_onTick`)
    }

    _onFinish() {
        console.log(`_onFinish`)
    }

    decideColorOfTimer() {
        //console.log(this.props.habit);
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
            var mom = moment().add('1', 'day').format('MM/DD/YYYY');;
            var dateObj = new Date(mom + " " + "00:00:00");
        //console.log(dateObj); //date obj exists
            return(<View style={{alignItems:'center'}}>
                            <CircleComponent navigator = {this.props.navigator} habit={this.props.habit} />
                            <CountdownTimer
                            till={dateObj}
                            renderTick={(data) => <TimeLabel {...data} color = {this.decideColorOfTimer()} />  }
                            onTick={this._onTick.bind(this)}
                            onFinish={this._onFinish.bind(this)} />
                    </View>
            );
        }
    }
}