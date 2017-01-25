import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Meteor from 'react-native-meteor';

export default class Scene5 extends Component {
    constructor(props){
        super(props);
        //this.state = {emojiState: this.props.habit.completed};
        this.state = {emojiState: this.props.habit.completed};
        console.log(this.state.emojiState);
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
    
                </View>
            </View>
        );
    }

    goBack() {
        this.props.navigator.pop();
    }

    toggleEmojiState() {
        console.log(this.props.habit);
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