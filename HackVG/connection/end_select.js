import React from 'react';
import {View, StyleSheet} from 'react-native';

export default class EndSelectScreen extends React.Component  {
  render() {
    return (
      <View style={styles.container}></View>
    );
  }
}


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
