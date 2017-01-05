import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TextInput } from 'react-native';
export default class Scene3 extends Component {
    constructor (props) {
        super(props);
        this.state = {text: "Enter Name of Habit"};
    }
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
                    <TextInput
                        style = {{borderColor:'gray', borderWidth:1, height:40, backgroundColor:"white"}}
                        placeholder = {this.state.text}
                        onChangeText = {(text) => this.setState({text})}

                    />
                </View>
                <View style = {styles.bottomContainer}>
                    <TouchableHighlight onPress={this.goToNextScene.bind(this)}>
                        <Text> SET HABIT </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
    goToNextScene() {
        this.props.navigator.push({screen:"Scene4"});
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
        paddingLeft:10,
        paddingRight:10,
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
