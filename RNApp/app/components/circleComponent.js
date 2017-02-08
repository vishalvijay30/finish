import React, { Component, PropTypes } from 'react';
import {View, StyleSheet, TouchableHighlight, Text, TouchableOpacity, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class CircleComponent extends Component{
    render() {
            console.log(this.props.habit);
            return(<View style={{margin:20, alignItems:"center", justifyContent:"center", height:147, width:147, borderRadius:100, borderWidth:2, borderColor:"black", backgroundColor:"#008080"}}>
                        <TouchableOpacity key={this.props.habit._id} onPress={() => this.goToSceneFive(this.props.habit)}>
                            <Text style={{color:"white", fontFamily:"Permanent Marker", fontSize:20, textAlign:"center"}}>{this.props.habit.title}</Text>
                        </TouchableOpacity>
                        <View><Icon name ="ios-flame" size={20} color="red"><Text style={{color:"white", fontFamily:"Impact"}}> {this.props.habit.streak}</Text></Icon></View>
                    </View>
            );
        
    }

    goToSceneFive(habit){
        console.log(habit);
        this.props.navigator.push({screen: 'Scene5', user: this.props.user, document: habit});
    }
}