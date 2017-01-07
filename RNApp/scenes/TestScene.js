import React, { Component, PropTypes } from 'react';
import {View, StyleSheet, TouchableHighlight, Text } from 'react-native';

export default class TestScene extends Component {
  //   static propTypes = {
  //   title: PropTypes.string.isRequired,
  //   onForward: PropTypes.func.isRequired,
  //   onBack: PropTypes.func.isRequired,
  // }
  render() {
    return (
      <View style = {styles.container}>

        <Text>Test Scene</Text>
        <TouchableHighlight onPress = {this.goToNext.bind(this)}>
          <Text> Next </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress = {this.goBackToHome.bind(this)}>
          <Text> Back </Text>
        </TouchableHighlight>
      </View>
    )
  }

  goToNext() {
    this.props.navigator.push({screen:"Scene2"});
  }

  goBackToHome() {
    this.props.navigator.push({screen:"HomeScene"});
  }
}

const styles = StyleSheet.create ({
  container: {
    paddingTop:30
  }
});