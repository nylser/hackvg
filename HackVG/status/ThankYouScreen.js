import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
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
      padding: 10,
      fontSize: 18,
      height: 70,
      backgroundColor: 'skyblue',
      //fontWeight: 'bold',
    },
});
  
export default class StatusScreen extends React.Component {

  static navigationOptions = {
    title: 'Dankeschön!',
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
  }

  render() {
    const station_list = [];
    return (
      <View style={styles.container}>
        <Text style={styles.item}>Vielen Dank!</Text>
        <SearchBar
          lightTheme
          onClearText={()=>{
            // Reset list based on location
          }}
          onChangeText={()=>{
            // Update list of train stations
          }}
        >Wohin soll es gehen?</SearchBar>
        <ScrollView>
          {station_list}
        </ScrollView>
      </View>
    );
  }
}
