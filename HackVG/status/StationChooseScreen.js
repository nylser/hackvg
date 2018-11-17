import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import GPSModule from "../API/GPSModule";
import MVGNearby from "../API/MVGNearby";
import TrainChooseScreen from '../status/TrainChooseScreen';

export default class StatusScreen extends React.Component {

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
    for(station of this.state.list){
      station_list.push(
        <Text style={styles.item} onPress={
          () => navigate('Status', {
            screen: TrainChooseScreen,
            props: this.props,
            data: {station: station}
          })
        }>{station.name}</Text>//, {station.place}</Text>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Bist du in der U-Bahn?</Text>
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
  
 