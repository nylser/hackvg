import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ConnectionScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      accuracy: 0,
      error: "",
    }

  }
  
  componentDidMount(){
    navigator.geolocation.getCurrentPosition((pos) => {
      const crd = pos.coords;

      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      this.setState(crd);
    }, (err) => {
      this.setState((state) => {
        state.error = err;
        return state;
      })
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hallo Welt!</Text>
        <Text>{this.state.latitude}, {this.state.longitude} (Accurate up to {this.state.accuracy} metres)</Text>
        <Text>Occurred Error: {this.state.error}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  