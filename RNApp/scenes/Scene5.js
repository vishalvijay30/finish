import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Meteor from 'react-native-meteor';

export default class Scene5 extends Component {
    constructor(){
        super();

        this.state = {emojiState:false};
        this.toggleEmojiState = this.toggleEmojiState.bind(this);
    }
    render() {
        let emoji = null;
        if (this.state.emojiState==false) {
            emoji = <Icon name="frown-o" size={50} color="red" />
        } else {
            emoji = <Icon name="smile-o" size={50} color="green" />
        }

        return (
            <View>
                <View style = {styles.topContainer}>
                    <Text> </Text>
                    <Text>
                        <TouchableOpacity style={{height:20,width:25}} onPress={this.goBack.bind(this)}><Icon name = "arrow-left" size = {20} color="#3399ff" /></TouchableOpacity>                         <Text style = {{ fontSize:30, color:"#3399ff" }}> FINISH </Text>                         <TouchableOpacity style={{height:20,width:25}} onPress={this.goToScene3.bind(this)}><Icon name = "plus" size = {20} color = "#3399ff"/></TouchableOpacity>

                     </Text>
                </View>
                <View style = {styles.fillerContainer}>
                </View>
                <View style = {styles.middleContainer}>
                    <Text style={{fontSize:30}}> Example </Text>

                    <Text></Text>
                    <Text style = {{fontSize:20}}> Timer will appear here </Text>
                    <Text></Text>
                    <TouchableOpacity onPress={this.toggleEmojiState}>
                        {emoji}
                    </TouchableOpacity>

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

    goBack() {
        this.props.navigator.push({screen:"Scene4"});
    }

    goToScene3() {
        this.props.navigator.push({screen:"Scene3"});
    }

    toggleEmojiState() {
        this.setState({emojiState:true});
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
