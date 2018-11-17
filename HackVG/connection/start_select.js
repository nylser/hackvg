import React from 'react';
import {StyleSheet, Text, View, ScrollView, Button, AsyncStorage} from 'react-native';
import {SearchBar} from 'react-native-elements';
import MVGQueryLocation from '../API/MVGQueryLocation';


export default class StartSelectScreen extends React.Component {

  constructor(props) {
    super(props);
    this.query = '';
    this.last_query = '';
    this.last_update = 0;
    this.state = {
      result_list: [],
    };
  }

  componentDidMount() {
    this.search.focus();
    
    setInterval(() => {
      if(Date.now() - this.last_update > 25 && this.query != this.last_query){
        this.doQuery();
      }
    }, 1000);
  }

  doQuery() {
    new MVGQueryLocation(this.query).query_location((list) => {
      this.setState({result_list: list});
      this.last_update = (new Date).getTime();
      this.last_query = this.query;
    });
  }

  render() {
    const {navigation} = this.props;
    const pre_val = navigation.getParam('pre_val', 'Test');
    const locations = [];
    this.state.result_list.forEach((location) => {
      if(location.type == 'station') {
        locations.push(<Text style={styles.item} onPress={(i) => 
          AsyncStorage.setItem('start', location.id, () => navigation.goBack())
        }>{location.name}</Text>)
      }
    });
    
    return (
      <View style={styles.container}>
        <SearchBar onChangeText={(text) => {
          this.query = text;
          if((new Date).getTime() - this.last_update > 100){
            new MVGQueryLocation(this.query).query_location((list) => {
              this.setState({result_list: list});
              this.last_update = (new Date).getTime();
              this.last_query = this.query;
            });
          }
        }}
        value={JSON.stringify(pre_val)} ref={search => this.search=search} placeholder="Start eingeben"/>
        <ScrollView>
          {locations}
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
    paddingTop: 0,
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
    backgroundColor: 'skyblue',
    color: 'white'
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
