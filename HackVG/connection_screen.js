import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import GPSModule from "./API/GPSModule";
import MVGNearby from "./API/MVGNearby";
import StationList from './StationList';

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
    const station_list = [];
    for(station of this.state.list){
      station_list.push(
        <Text style={styles.item}>{station.name}, {station.place}</Text>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Hallo Welt 2!</Text>
        <Text>{this.state.latitude}, {this.state.longitude} (Accurate up to {this.state.accuracy} metres)</Text>
        <Text>Occurred Error: {this.state.error}</Text>
        <Text>Nearby stations:</Text>
        <ScrollView>
          {station_list}
        </ScrollView>
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
      paddingTop: 22,
    },
    heading: {
      padding: 10,
      fontSize: 20,
      height: 44,
      fontWeight: 'bold',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
});
  