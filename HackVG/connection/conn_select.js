import React from 'react';
import { StyleSheet, Text, Button, View, ScrollView, AsyncStorage } from 'react-native';
import { SearchBar } from 'react-native-elements';
import GPSModule from "../API/GPSModule";
import MVGNearby from "../API/MVGNearby";
import MVGQueryLocation from '../API/MVGQueryLocation';





export default class ConnectionSelectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: null,
      end: null,
      connList: []
    }
  }

  componentDidMount() {
    GPSModule.updatePosition((coords, error) => {
      if (coords) {
        this.setState(coords);
        new MVGNearby(this.state.latitude, this.state.longitude).nearbyStations((list, error) => {
          this.setState((state) => {
            state.start = list[0];
            return state;
          })
        })
      }
      else if (error) {
        this.setState({ error: error.message });
      }
    });
    new MVGQueryLocation('Hauptbahnhof').query_location((list) => {
      this.setState((state) => {
        state.end = list[0];
        return state;
      })
    })
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
    const end_input = <SearchBar lightTheme onFocus={(e) => this.props.navigation.navigate('EndSelectScreen', {pre_val: this.state.end, callback: (place) => {
      this.setState((state) => {
        return {
          start: state.start,
          end: place,
        }
      });
    }})} value={this.state.end ? this.state.end.place : ''} placeholder="Ziel eingeben" />

    return (
      <View style={styles.container}>
        {start_input}
        {end_input}
        <ScrollView>
          <Text style={{...styles.item, backgroundColor: 'white'}}>U6 | U5         13:16</Text>
          <Text style={{...styles.item, backgroundColor: 'orange'}}>U6 | U5         13:36</Text>
          <Text style={{...styles.item, backgroundColor: 'red'}}>U6 | U5         13:56</Text>
          <Text style={{...styles.item, backgroundColor: 'yellow'}}>U6 | U5         14:16</Text>
          <Text style={{...styles.item, backgroundColor: 'white'}}>U6 | U5         14:36</Text>
          <Text style={{...styles.item, backgroundColor: 'white'}}>U6 | U5         14:56</Text>
          <Text style={{...styles.item, backgroundColor: 'orange'}}>U6 | U5         15:16</Text>
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
    borderWidth: 1,
    borderColor: 'white',
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
