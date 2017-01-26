import React, { Component, PropTypes } from 'react';
import {View, StyleSheet, TouchableHighlight, Text, TouchableOpacity, ScrollView } from 'react-native';

import CircleComponent from './circleComponent';

export default class RowComponent extends Component{
    render() {
        console.log(this.props.habit_pair);
        return(<View style={{flexDirection: 'row', flexWrap:'wrap'}}>
                        <CircleComponent navigator = {this.props.navigator} habit={this.props.habit_pair[0]} />
                        <CircleComponent navigator = {this.props.navigator} habit={this.props.habit_pair[1]} />
                </View>
            );
    }
}