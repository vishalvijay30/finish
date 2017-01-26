import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Meteor from 'react-native-meteor';

export default class Scene5 extends Component {
    constructor(props){
        super(props);
        //this.state = {emojiState: this.props.habit.completed};
        console.log(this.props.habit);
        this.state = {emojiState: this.props.habit.completed};
        this.toggleEmojiState = this.toggleEmojiState.bind(this);
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
                </View>
                <View style = {styles.fillerContainer}>
                </View>
                <View style = {styles.middleContainer}>
                    <Text style={{fontSize:30}}> {this.props.habit.title} </Text>

                    <Text></Text>
                    <Text style = {{fontSize:20}}> Timer will appear here </Text>
                    <Text></Text>
                    <Text style = {{fontSize:20}}>Max streak: {this.props.habit.max}</Text>
                    <TouchableOpacity onPress={this.toggleEmojiState}>
                        {emoji}
                    </TouchableOpacity>

                </View>
                <View style = {styles.bottomContainer}>
                    <Icon.Button name = "plus-square-o" size = {40} onPress = {this.removeHabit.bind()}>
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
        goBack();
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
        backgroundColor: '#e6ffff',
    },
    middleContainer: {
        justifyContent:'center',
        alignItems:'center',
        height:500,
        backgroundColor: '#008080',
    },
    bottomContainer: {
        justifyContent:'center',
        alignItems:'center',
        height:75,
        backgroundColor:'#008080',
    },
    fillerContainer: {
        backgroundColor:'#008080',
        height:50,
    }

});