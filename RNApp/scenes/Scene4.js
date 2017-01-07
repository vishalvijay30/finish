import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Meteor from 'react-native-meteor';
export default class Scene4 extends Component {
    // constructor(props) {
    //         super(props);
    //         console.log("made it to scene 4!");
    //         //this.goToNextScene = this.goToNextScene.bind(this);
    // }
    render() {
        console.log("vishal");
        return (
            <View>
                <View style = {styles.topContainer}>
                    <Text> </Text>
                    <Text>
                         <TouchableOpacity style={{height:20,width:25}} onPress={this.goBack.bind(this)}><Icon name = "arrow-left" size = {20} color="#3399ff" /></TouchableOpacity>                         <Text style = {{ fontSize:30, color: "#3399ff" }}> FINISH </Text>                         <TouchableOpacity style={{height:20,width:25}} onPress={this.goBack.bind(this)}><Icon name = "plus" size = {20} color = "#3399ff"/></TouchableOpacity>
                     </Text>
                </View>
                <View style = {styles.fillerContainer}>
                </View>
                <View style = {styles.middleContainer}>
                    <Text style ={{fontSize:30}}> Habits List </Text>

                         <ScrollView>
                            {this.props.db.map((habit) => {
                                return <TouchableOpacity onPress={this.goToNextScene.bind(this)}><Text>{habit.title}</Text></TouchableOpacity>
                            })}
                        </ScrollView>

                </View>
                <View style = {styles.bottomContainer}>
                    <Icon.Button onPress={this.goHome.bind(this)} name="home" size={40} color="white">
                    </Icon.Button>
                </View>
            </View>
        );
    }

    goToNextScene(habitObject) {
        console.log("about to go to scene5");
        this.props.navigator.push({ screen:"Scene5" });
    }

    goHome() {
        this.props.navigator.push({screen:"HomeScene"});
    }

    goBack() {
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
