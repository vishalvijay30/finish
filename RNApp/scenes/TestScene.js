import React, { Component, PropTypes } from 'react';
import {View, StyleSheet, TouchableHighlight, Text } from 'react-native';

export default class TestScene extends Component {
    static propTypes = {
    title: PropTypes.string.isRequired,
    onForward: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  }
  render() {
    return (
      <View style = {styles.container}>
        <Text>Current Scene: { this.props.title }</Text>
        <TouchableHighlight onPress={this.props.onForward}>
          <Text>Tap me to load the next scene</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.onBack}>
          <Text>Tap me to go back</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  container: {
    paddingTop:30
  }
});