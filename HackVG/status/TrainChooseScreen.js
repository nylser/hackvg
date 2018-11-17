import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';

export default class TrainChooseScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      station: props.station
    }

  }
  
  componentDidMount(){
  }

  render() {
    const station_list = [];
    for(station of this.state.list){
      station_list.push(
        <Text style={styles.item}>{station.name}</Text>//, {station.place}</Text>
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
  
  