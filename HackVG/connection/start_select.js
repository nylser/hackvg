import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import MVGQueryLocation from '../API/MVGQueryLocation';


export default class StartSelectScreen extends React.Component  {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.search.focus();
  }

  render() {
    const {navigation} = this.props;
    const pre_val = navigation.getParam('pre_val', '');
    return (
      <View style={styles.container}>
        <SearchBar value={JSON.stringify(pre_val)} ref={search => this.search=search} placeholder="Start eingeben"/>
      </View>
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
    paddingTop: 0,
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
