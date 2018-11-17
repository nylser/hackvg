import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
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
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hier eine Verbindung suchen und finden!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
      alignItems: 'center',
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
  