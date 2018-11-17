import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import StationChooseScreen from './status/StationChooseScreen';

export default class StatusScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      screen: props.screen || StationChooseScreen,
      data: props.data,
      props: props.props
    }

  }
  
  render() {
    const newData = Object.assign({}, this.props, this.state.props);
    newData.data = this.state.data;
    return React.createElement(this.state.screen, newData);
  }
}

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
  
  