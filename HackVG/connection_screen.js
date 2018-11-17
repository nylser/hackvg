import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GPSModule from "./API/GPSModule";
import MVGNearby from "./API/MVGNearby";

export default class ConnectionScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      accuracy: 0,
      error: "",
      list: []
    }

  }
  
  componentDidMount(){
    GPSModule.updatePosition((coords, error) => {
      if(coords){
        this.setState(coords);
        new MVGNearby(this.state.latitude, this.state.longitude).nearbyStations((list, error)=>{
          this.setState((state) => {
            state.list = list || error;
            return state;
          })
        })
      }
      else if(error){
        this.setState({error: error.message});
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hallo Welt!</Text>
        <Text>{this.state.latitude}, {this.state.longitude} (Accurate up to {this.state.accuracy} metres)</Text>
        <Text>Occurred Error: {this.state.error}</Text>
        <Text>Nearby stations: {JSON.stringify(this.state.list)}</Text>
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
  