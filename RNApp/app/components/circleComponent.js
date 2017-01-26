import React, { Component, PropTypes } from 'react';
import {View, StyleSheet, TouchableHighlight, Text, TouchableOpacity, ScrollView } from 'react-native';

export default class CircleComponent extends Component{
    render() {
        if (!this.props.habit) {
            return (<View />);
        } else {
            console.log(this.props.habit);
            return(<View style={{margin:20, alignItems:"center", justifyContent:"center", height:120, width:120, borderRadius:100, borderWidth:2, borderColor:"black"}}>
                        <TouchableOpacity key={this.props.habit._id} onPress={() => this.goToSceneFive(this.props.habit)}>
                            <Text>{this.props.habit.title}</Text>
                        </TouchableOpacity>
                    </View>
            );
        }
    }

    goToSceneFive(habit){
        console.log(habit);
        this.props.navigator.push({screen: 'Scene5', user: this.props.user, document: habit});
    }
}