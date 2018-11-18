import React from 'react';
import { StyleSheet, Text, Button, View, ScrollView, AsyncStorage } from 'react-native';
import { SearchBar } from 'react-native-elements';
import GPSModule from "../API/GPSModule";
import MVGNearby from "../API/MVGNearby";





export default class ConnectionSelectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: null,
      end: null,
    }
  }

  componentDidMount() {
    GPSModule.updatePosition((coords, error) => {
      if (coords) {
        this.setState(coords);
        new MVGNearby(this.state.latitude, this.state.longitude).nearbyStations((list, error) => {
          this.setState((state) => {
            state.nearby_list = list || error;
            state.start = state.nearby_list[0];
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
    this.props.navigation.navigate('StartSelectScreen', {pre_val: this.state.start});
  }

  handleEndClick(e) {
    this.props.navigation.navigate('EndSelectScreen', {pre_val: this.state.end});
  }

  render() {
    const start_input = <SearchBar lightTheme onFocus={(e) => { this.props.navigation.navigate('StartSelectScreen', {pre_val: this.state.start, callback: (place) => this.setState((state) => {
      return {
        start: place,
        end: state.end
      };
    })});
    }} value={this.state.start ? this.state.start.place : ''} placeholder="Start eingeben" />
    const end_input = <SearchBar lightTheme onFocus={(e) => this.props.navigation.navigate('EndSelectScreen', {pre_val: this.state.end, callback: (place) => this.setState((state) => {
      return {
        start: state.start,
        end: place,
      }
    })})} value={this.state.end ? this.state.end.place : ''} placeholder="Ziel eingeben" />

    return (
      <View style={styles.container}>
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
    height: 70,
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
