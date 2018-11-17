import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import StationChooseScreen from './status/StationChooseScreen';
import TrainChooseScreen from './status/TrainChooseScreen';

export default StatusScreen = createStackNavigator({
  Station: {screen: StationChooseScreen},
  Train: {screen: TrainChooseScreen}
});

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'center',
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
});
  
  