import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
export default class Scene5 extends Component {
    render() {
        return (
            <View>
                <View style = {styles.topContainer}>
                    <Text> </Text>
                    <Text style = {{ fontSize:30 }}> FINISH </Text>
                </View>
                <View style = {styles.fillerContainer}>
                </View>
                <View style = {styles.middleContainer}>
                    <Text> Habit: 30 situps </Text>
                    <Text> Timer will appear here </Text>
                    <Text> Smiley face will appear here </Text>
                </View>
                <View style = {styles.bottomContainer}>
                    <TouchableHighlight onPress = {this.goHome.bind(this)}>
                        <Text> HOME </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    goHome() {
        this.props.navigator.push({screen:"HomeScene"});
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
        backgroundColor: '#e6ffff',
    },
    bottomContainer: {
        justifyContent:'center',
        alignItems:'center',
        height:75,
        backgroundColor:'#3399ff',
    },
    fillerContainer: {
        backgroundColor:'#3399ff',
        height:50,
    }

});
