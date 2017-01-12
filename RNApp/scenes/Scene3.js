import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Meteor from 'react-native-meteor';
export default class Scene3 extends Component {

    constructor (props) {
        super(props);
        this.state = {text: "Enter Name of Habit"};
        this.handleAddItem = this.handleAddItem.bind(this);
    }

    handleAddItem() {
        console.log("reached add");
        Meteor.call('addHabit', { userId: this.props.user,  title: this.state.text, streak: 0 }, (err, res) => {
            console.log('addHabit', err, res);
            this.goBack();
        });


    }
    render() {
        return (
            <View>
                <View style = {styles.topContainer}>
                    
                         <TouchableOpacity style={{height:20,width:25}} onPress={this.goBack.bind(this)}><Icon name = "arrow-left" size = {20} color="#3399ff" /></TouchableOpacity> 
                        <Text style = {{ color:"#3399ff",fontSize:30 }}> FINISH </Text>                         

                </View>
                <View style = {styles.fillerContainer}>
                </View>
                <View style = {styles.middleContainer}>

                    <TextInput
                        style = {{height:40}}
                        placeholder = {this.state.text}
                        multiLine = {true}
                        numberOfLines = {2}
                        borderColor = 'green'
                        borderWidth = {2}
                        onChangeText = {(text) => this.setState({text})}

                    />

                </View>
                <View style = {styles.bottomContainer}>

                    <Icon.Button style={{backgroundColor:'green'}} name = "check" size = {40} onPress = {this.handleAddItem}>

                        <Text style = {{fontSize:30, color:'white'}}> SET HABIT </Text>
                    </Icon.Button>
                </View>
            </View>
        );
    }

    goBack() {
        this.props.navigator.pop();
    }
}

const styles = StyleSheet.create({
    topContainer: {
        justifyContent:'center',
        alignItems:'center',
        height:50,
        backgroundColor: '#e6ffff',
        //backgroundColor:'white',
    },
    middleContainer: {
        justifyContent:'center',
        alignItems:'center',
        height:500,
        backgroundColor: '#008080',
        paddingLeft:10,
        paddingRight:10,
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
