import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Meteor from 'react-native-meteor';
import CountDown from 'react-native-countdown';

export default class Scene5 extends Component {
    constructor(props){
        super(props);
        var date = new Date();
        var now = date.getTime();

        var millisInDay = 60*60*24;

        var end = ((Math.floor(now/millisInDay) + 1) * millisInDay) - now;

        //this.state = {emojiState: this.props.habit.completed};
        console.log(this.props.habit);
        this.state = {emojiState: this.props.habit.completed, end: end};
        this.toggleEmojiState = this.toggleEmojiState.bind(this);
        this.goBack = this.goBack.bind(this);
    }
    render() {
        let emoji = null;
        if (this.state.emojiState==false) {
            emoji = <Icon name="frown-o" size={80} color="#D71F3E" />
        } else {
            emoji = <Icon name="smile-o" size={80} color="#1BA541" />
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
                    <Text style={{fontSize:30, fontFamily:"Permanent Marker", color:"white", align:"center"}}> {this.props.habit.title} </Text>
                    <Text></Text>
                    <CountDown
                        time={this.state.end} //default 60
                        buttonStyle={{backgroundColor: '48C9B0'}}
                        textStyle={{color:'black', fontSize: 20}} //default black
                        disabledTextStyle={{color:'black', fontSize: 20}} //default gray
                    />
                    <Text></Text>
                    <View><Icon name ="fire" size={30} color="red"><Text style={{color:"white", fontFamily:"Impact"}}> {this.props.habit.streak}</Text></Icon></View>
                    <Text></Text>
                    <View><Icon name ="star" size={30} color="yellow"><Text style={{color:"white", fontFamily:"Impact"}}> {this.props.habit.max}</Text></Icon></View>
                    <Text></Text>
                    <TouchableOpacity onPress={this.toggleEmojiState}>
                        {emoji}
                    </TouchableOpacity>

                </View>
                <View style = {styles.bottomContainer}>
                    <TouchableOpacity onPress = {this.removeHabit.bind(this)}>
                        <Icon name = "minus-circle" size={100} color="red" />
                    </TouchableOpacity>
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
        height:125,
        backgroundColor:'#48C9B0',
    },

});