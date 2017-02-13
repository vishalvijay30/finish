import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Meteor from 'react-native-meteor';
export default class Scene3 extends Component {

    constructor (props) {
        super(props);
        this.state = {text: "Enter Habit", inputHeight: 70};
        this.handleAddItem = this.handleAddItem.bind(this);
        this.decideTextToDisplay = this.decideTextToDisplay.bind(this);
        this.onTextContentSizeChange = this.onTextContentSizeChange.bind(this);
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
            <View style = {{flex:1}}>
                <View style = {styles.topContainer}>

                        <TouchableOpacity style={{paddingLeft:10}}onPress={this.goBack.bind(this)}><Icon name = "arrow-left" size = {40} color="white" /></TouchableOpacity>
                        <Text style = {{ color:"white",fontSize:30, fontFamily:"Rock Salt", flex: 1, textAlign:'center', paddingRight:35 }}> FINISH </Text>

                </View>
                <View style = {styles.fillerContainer}>
                </View>
                <View style = {styles.middleContainer}>

                    <TextInput
                        style = {{height:this.state.inputHeight, fontFamily:"Impact", fontSize:50, color:"white", textAlign:"center"}}
                        placeholder = {this.state.text}
                        multiLine = {true}
                        numberOfLines = {4}
                        onChangeText = {(text) => this.decideTextToDisplay(text)}
                        onContentSizeChange = {this.onTextContentSizeChange.bind(this)}
                    />

                </View>
                <View style = {styles.bottomContainer}>

                    <Icon.Button style={{backgroundColor:'green'}} name = "check" size = {60} onPress = {this.handleAddItem}>

                        <Text style = {{fontSize:35, color:'white'}}> SET HABIT</Text>
                    </Icon.Button>
                </View>
            </View>
        );
    }

    goBack() {
        this.props.navigator.pop();
    }

    decideTextToDisplay(newText) {
        if (newText.length == 0) {
            this.setState({text: "Enter Habit"});
        } else {
            this.setState({text: newText});
        }
    }
    onTextContentSizeChange = (event) => {
        this.setState({
            inputHeight: Math.min(event.nativeEvent.contentSize.height, 100)
        });
    }
}

const styles = StyleSheet.create({
    // topContainer: {
    //     justifyContent:'center',
    //     alignItems:'center',
    //     height:50,
    //     backgroundColor: '#48C9B0',
    //     //backgroundColor:'white',
    // },
    // middleContainer: {
    //     justifyContent:'center',
    //     alignItems:'center',
    //     height:500,
    //     backgroundColor: '#48C9B0',
    //     paddingLeft:10,
    //     paddingRight:10,
    // },
    // bottomContainer: {
    //     justifyContent:'center',
    //     //alignItems:'center',
    //     height:75,
    //     backgroundColor:'#48C9B0',
    //     width:Dimensions.get('window').width,
    // },
    topContainer : {
        backgroundColor: "#48C9B0",
        //backgroundColor:'green',
        paddingBottom: 10,
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    middleContainer: {
        backgroundColor: "#48C9B0",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomContainer: {
        backgroundColor: "#48C9B0",
        //backgroundColor:'red',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
    },
    fillerContainer: {
        backgroundColor:'#48C9B0',
        height:50,
    }

});