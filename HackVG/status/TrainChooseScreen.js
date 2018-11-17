import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import MVGDepart from '../API/MVGDepart';

export default class TrainChooseScreen extends React.Component {
  static navigationOptions = {
    title: 'In welcher U-Bahn?',
    backgroundColor: 'steelblue'
  };

  constructor(props){
    super(props);
    this.station = props.navigation.getParam('station', {id:0});
    this.state = {
      list: [],
    }
  }
  
  componentDidMount(){
    new MVGDepart(this.props.navigation.getParam('station', {id:0})).departings((list) => {
      this.setState({list});
    })
  }

  render() {
    const train_list = [];
    for(train of this.state.list){
      train_list.push(
        <Text style={styles.item}>{train.lineNumber} {train.destination}</Text>//, {station.place}</Text>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>{this.station.name}</Text>
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
      color: 'white'
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
      backgroundColor: 'skyblue'
    },
});
  
  