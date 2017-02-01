import React, { Component, PropTypes } from 'react';
import {View, StyleSheet, TouchableHighlight, Text, TouchableOpacity, ScrollView } from 'react-native';

export default class TimeLabel extends Component {
  render() {
    return (
      <View>
        <Text style={{fontSize:20}}>
          {this.props.hours} : {this.props.minutes} : {this.props.seconds}
        </Text>
      </View>
    )
  }
}