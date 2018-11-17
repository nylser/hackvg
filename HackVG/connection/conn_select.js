import React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import GPSModule from "../API/GPSModule";
import MVGNearby from "../API/MVGNearby";





export default class ConnectionSelectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      accuracy: 0,
      error: "",
      nearby_list: []
    }
  }

  componentDidMount() {
    GPSModule.updatePosition((coords, error) => {
      if (coords) {
        this.setState(coords);
        new MVGNearby(this.state.latitude, this.state.longitude).nearbyStations((list, error) => {
          this.setState((state) => {
            state.nearby_list = list || error;
            return state;
          })
        })
      }
      else if (error) {
        this.setState({ error: error.message });
      }
    });
  }

  handleStartClick(e) {
    this.props.navigation.navigate('StartSelectScreen');
    /**val = e.value;
    if (val == "Start eingeben") {
      val = null;
    }
    this.props.navigation.navigate('StartSelectScreen', {pre_val: val});**/;
  }

  handleEndClick(e) {
    val = e.value;
    if (val == "Ziel eingeben") {
      val = null;
    }
    this.props.navigation.navigate('EndSelectScreen', {pre_val: val});
  }

  render() {
    if (this.state.nearby_list.length > 0) {
      start_input = <SearchBar onFocus={(e) => {
        e.preventDefault();
        this.props.navigation.navigate('StartSelectScreen', {pre_val: e.value});
        
      }} value={this.state.nearby_list[0].name} />
    } else {
      start_input = <SearchBar onFocus={(e) => this.props.navigation.navigate('StartSelectScreen', {pre_val: e.value})} placeholder="Start eingeben" />
    }
    end_input = <SearchBar onFocus={(e) => this.props.navigation.navigate('EndSelectScreen', {pre_val: e.value})} placeholder="Ziel eingeben" />

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Hier eine Verbindung suchen und finden!</Text>
        {start_input}
        {end_input}
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
