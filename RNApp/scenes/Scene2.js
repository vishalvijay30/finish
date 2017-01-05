import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
export default class Scene2 extends Component {
    render() {
        return (
            <View>
                <View style = {styles.topContainer}>
                    <Text> </Text>
                    <Text style = {{ fontSize:30 }}> FINISH </Text>
                </View>
                <View style = {styles.middleContainer}>
                    <Text> Losers Have Goals. </Text>
                    <Text> Winners Have Habits. </Text>
                </View>
                <View style = {styles.bottomContainer}>
                    <TouchableHighlight onPress = {this.goToNextScene.bind(this)}>
                        <Text> CREATE A HABIT </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    goToNextScene() {
        this.props.navigator.push({screen:"Scene3"});
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
        height:550,
        backgroundColor: 'white',
    },
    bottomContainer: {
        justifyContent:'center',
        alignItems:'center',
        height:75,
        backgroundColor:'#e6ffff',
    },

});
