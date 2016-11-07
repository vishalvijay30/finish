/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/*
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Finish extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Finish', () => Finish);
*/

import React, { Component } from 'react';
import { Navigator, AppRegistry, Text, View } from 'react-native';

import TestScene from './scenes/TestScene'

class Finish extends Component {
  render() {
    return (
      <Navigator
        initialRoute = {{title: 'My Initial Scene', index:0}}
        renderScene = {(route, navigator) =>
          <TestScene
            title = {route.title},

            //function to call when a new scene is called
            onForward = { () => {
              const nextIndex = route.index + 1;
              navigator.push({
                title: 'Scene' + nextIndex,
                index: nextIndex
              });
            }}

            //function to call to go back to the previous scene
            onBack = { () => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
          />
        }
      />
    )
  }
}



AppRegistry.registerComponent('Finish', () => Finish)