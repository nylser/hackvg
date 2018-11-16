import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      accuracy: 0
    }

  }
  
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(function success(pos) {
      var crd = pos.coords;

      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      this.setState(crd);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hallo Welt!</Text>
        <Text>{this.state.latitude}, {this.state.longitude} (Accurate up to {this.state.accuracy} metres)</Text>
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
