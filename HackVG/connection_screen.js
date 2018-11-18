import React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import ConnectionSelectScreen from './connection/conn_select.js';
import StartSelectScreen from './connection/start_select.js';

const ConnectionScreen = createStackNavigator({
  SelectScreen: {
    screen: ConnectionSelectScreen, 
    navigationOptions: ({navigation}) => ({
      title: `Verbindung suchen und finden`,
      headerStyle: styles.heading,
      headerTintColor: 'white',
    })
  },
  StartSelectScreen: {
    screen: StartSelectScreen,
    navigationOptions: ({navigation}) => ({
      title: `Start auswählen`,
      headerStyle: styles.heading,
      headerTintColor: 'white',
    })
  },
  EndSelectScreen: {
    screen: StartSelectScreen,
    navigationOptions: ({navigation}) => ({
      title: `Ziel auswählen`,
      headerStyle: styles.heading,
      headerTintColor: 'white',
    })
  },
});

export default ConnectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: 22,
  },
  heading: {
    padding: 15,
    fontSize: 20,
    height: 60,
    fontWeight: 'bold',
    backgroundColor: 'steelblue',
    color: 'white'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: 'skyblue'
  },
  empty_input: {
    padding: 10,
    fontSize: 18,
    height: 50,
    backgroundColor: 'skyblue',
    borderWidth: 1,
    borderColor: 'black',
    color: 'grey'
  },
  input: {
    padding: 10,
    fontSize: 18,
    height: 50,
    backgroundColor: 'skyblue',
    borderWidth: 1,
    borderColor: 'black',
    color: 'white'
  }
});
