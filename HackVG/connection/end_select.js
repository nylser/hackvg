import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-elements';
import MVGQueryLocation from '../API/MVGQueryLocation';

export default class StopSelectScreen extends React.Component {
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
      if((new Date).getTime() - this.last_update > 25 && this.query != this.last_query) {
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
    console.log(navigation);
    const pre_val = navigation.getParam('pre_val', 'Test');
    console.log(pre_val);
    const locations = []
    this.state.result_list.forEach((location) => {
      if(location.type=='station'){
        locations.push(<Text onPress={(i) => this.props.navigation.navigate('ConnectionSelectScreen', {end: location.id})}  style={styles.item}>{location.name} </Text>);    
      }
    });
    
    return (
      <View style={styles.container}>
        <SearchBar onChangeText={(text) => {
          this.query = text;
          if((new Date).getTime() - this.last_update > 100) {
            this.doQuery();
          }
        }} onSubmitEditing={
          ()=> {
            if(this.query != this.last_query) {
              this.doQuery();
            }
          }
        }
        value={JSON.stringify(pre_val)} ref={search => this.search=search} placeholder="Ziel eingeben"/>
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
