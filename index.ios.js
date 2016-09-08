/* @flow */

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Stop2TravellerClient extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Stop 2.0 Traveller Client
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
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

AppRegistry.registerComponent('Stop2TravellerClient', () => Stop2TravellerClient);
