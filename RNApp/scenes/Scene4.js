import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
export default class Scene4 extends Component {
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
                    <Text> Revised View#4 will appear here </Text>
                </View>
                <View style = {styles.bottomContainer}>
                    <TouchableHighlight onPress = {this.goToNextScene.bind(this)}>
                        <Text> NEXT </Text>
                    </TouchableHighlight>

                </View>
            </View>
        );
    }

    goToNextScene() {
        this.props.navigator.push({screen:"Scene5"});
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
        backgroundColor: 'white',
    },
    bottomContainer: {
        justifyContent:'center',
        alignItems:'center',
        height:75,
        backgroundColor:'#e6ffff',
    },
    fillerContainer: {
        backgroundColor:'#3399ff',
        height:50,
    }

});
