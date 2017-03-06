import React, { Component, PropTypes } from 'react';
import {View, StyleSheet, TouchableHighlight, Text, TouchableOpacity, ScrollView } from 'react-native';

export default class TimeLabel extends Component {
  render() {
    //this.decideColorOfTimer();

    return (
      <View>
        <Text style={{fontSize:30, fontFamily:"Impact", color:this.props.color}}>
          {this.props.hours} : {this.props.minutes} : {this.props.seconds}
        </Text>
      </View>
    )
  }
}
