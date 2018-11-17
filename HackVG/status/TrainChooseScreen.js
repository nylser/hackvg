import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import MVGDepart from '../API/MVGDepart';

export default class TrainChooseScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('station', {name:"Fehler!"}).name,
      headerStyle: styles.heading,
      headerTintColor: 'white',
    }
  };

  constructor(props){
    super(props);
    this.station = props.navigation.getParam('station', {id:0});
    this.state = {
      list: [],
    }
  }
  
  componentDidMount(){
    new MVGDepart(this.props.navigation.getParam('station', {id:0})).departings((servingLines, departures) => { this.setState({list:departures});
    })
  }

  render() {
    const train_list = [];
    for(train of this.state.list){
      const onpressmethod = null;
      //const onpressmethod = () => {
        // train in depid, label, product, destination, 
      //}; // Construct useful method here
      const date = new Date();
      date.setTime(train.departureTime);
      train_list.push(
        <Text style={{...styles.item, alignItems: 'stretch', flex: 1}}><Text style={{color: train.lineBackgroundColor}}>{train.label}</Text><Text style={{alignSelf:'flex-start'}}>   {train.destination}   </Text><Text style={{alignSelf:'flex-end', color: train.departureTime < Date.now()? 'red': 'green'}}>{date.getHours()}:{date.getMinutes() < 10 ? "0" : ""}{date.getMinutes()}</Text></Text>//, {station.place}</Text>
      )
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          {train_list}
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
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
      backgroundColor: 'skyblue',
      color: 'black',
      fontWeight: 'bold'
    },
});
  
  