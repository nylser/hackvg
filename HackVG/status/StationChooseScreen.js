import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import GPSModule from "../API/GPSModule";
import MVGNearby from "../API/MVGNearby";
import {SearchBar} from 'react-native-elements';

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
      padding: 15,
      fontSize: 18,
      height: 70,
      backgroundColor: 'skyblue',
      //fontWeight: 'bold',
    },
});
  
export default class StatusScreen extends React.Component {

  static navigationOptions = {
    title: 'Geht es gleich los?',
    headerStyle: styles.heading,
    headerTintColor: 'white',
  };

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
    const {navigate} = this.props.navigation;
    this.state.list.forEach((station) => {
      station_list.push(
        <Text style={styles.item} onPress={
          () => navigate('Train', {station})
        }>{station.name}</Text>
      )
    });
    return (
      <View style={styles.container}>
        <SearchBar
          lightTheme
          onClearText={()=>{
            // Reset list based on location
          }}
          onChangeText={()=>{
            // Update list of train stations
          }}
        >Anderer Startbahnhof?</SearchBar>
        <ScrollView>
          {station_list}
        </ScrollView>
      </View>
    );
  }
}
