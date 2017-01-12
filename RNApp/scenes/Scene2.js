import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Scene2 extends Component {
    render() {
        return (
            <View>
                <View style = {styles.topContainer}>
                    <Text>
                         <TouchableOpacity style={{height:20,width:25}} onPress={this.goBack.bind(this)}><Icon name = "arrow-left" size = {20} color="#3399ff" /></TouchableOpacity>
                            <Text style = {{ fontSize:30, color:"#3399ff" }}> FINISH </Text>
                        <TouchableOpacity style={{height:20,width:25}} onPress={this.goToNextScene.bind(this)}><Icon name = "plus" size = {20} color = "#3399ff"/></TouchableOpacity>
                     </Text>
                </View>
                <View style = {styles.middleContainer}>
                    <Text style = {{fontSize:35, color:"white"}}> Losers Have Goals. </Text>
                    <Text style = {{fontSize:35, color:"white"}}> Winners Have Habits. </Text>
                </View>
                <View style = {styles.bottomContainer}>
                    <Icon.Button name = "plus-square-o" size = {40} onPress = {this.goToNextScene.bind(this)}>
                        <Text style = {{fontSize:20, color:"white"}}> CREATE A HABIT </Text>
                    </Icon.Button>
                </View>
            </View>
        );
    }

    goToNextScene() {
        this.props.navigator.push({screen:"Scene3", user: this.props.user, db: this.props.db});
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
        //backgroundColor: 'white',
    },
    middleContainer: {
        justifyContent:'center',
        alignItems:'center',
        height:550,
        backgroundColor: '#008080',
    },
    bottomContainer: {
        justifyContent:'center',
        alignItems:'center',
        height:75,
        backgroundColor:'#008080',
    },

});
