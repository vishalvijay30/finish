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
            title = { route.title }

            //function to call when a new scene is called
            onForward = { () => {
              const nextIndex = route.index + 1;
              navigator.push({
                title: 'Scene' + nextIndex,
                index: nextIndex,
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