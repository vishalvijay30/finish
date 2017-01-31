import React, { Component, PropTypes } from 'react';
import {View, StyleSheet, TouchableHighlight, Text, TouchableOpacity, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class CircleComponent extends Component{
    render() {
        if (!this.props.habit) {
            return (<View />);
        } else {
            console.log(this.props.habit);
            return(<View style={{margin:20, alignItems:"center", justifyContent:"center", height:147, width:147, borderRadius:100, borderWidth:2, borderColor:"black", backgroundColor:"#008080"}}>
                        <TouchableOpacity key={this.props.habit._id} onPress={() => this.goToSceneFive(this.props.habit)}>
                            <Text style={{color:"white", fontFamily:"Permanent Marker", fontSize:15, textAlign:"center"}}>{this.props.habit.title}</Text>
                        </TouchableOpacity>
                        <View><Icon name ="bolt" size={20} color="yellow"><Text style={{color:"white", fontFamily:"Rock Salt"}}>{this.props.habit.streak}</Text></Icon></View>
                    </View>
            );
        }
    }

    goToSceneFive(habit){
        console.log(habit);
        this.props.navigator.push({screen: 'Scene5', user: this.props.user, document: habit});
    }
}