import React, { Component, PropTypes } from 'react';
import {View, StyleSheet, TouchableHighlight, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class CircleComponent extends Component{
    render() {
            //console.log(this.props.habit);
return(<View><TouchableOpacity onPress={() => this.goToSceneFive(this.props.habit)} style={{margin:20, alignItems:"center", justifyContent:"center", height:147, width:147, borderRadius:100, borderWidth:3, borderColor:this.decideBorderColor(), backgroundColor:"#008080"}}>
                           <View>
                            <Text style={{color:"white", fontFamily:"Permanent Marker", fontSize:20, textAlign:"center", backgroundColor:'transparent'}}>{this.props.habit.title}</Text>
                        <View style={{alignItems:'center'}}><Icon name ="ios-flame" size={20} color="red"><Text style={{color:"white", fontFamily:"Impact"}}> {this.props.habit.streak}</Text></Icon></View>
                         </View>
                    </TouchableOpacity></View>
            );

    }

    goToSceneFive(habit){
        //console.log(habit);
        this.props.navigator.push({screen: 'Scene5', user: this.props.user, document: habit});
    }

    decideBorderColor() {
        if(this.props.habit.completed) {
            return "#1BA541";
        } else {
            return "#D71F3E";
        }
    }
}