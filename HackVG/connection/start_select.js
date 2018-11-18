import React from 'react';
import {StyleSheet, Text, View, ScrollView, Button, AsyncStorage} from 'react-native';
import {SearchBar} from 'react-native-elements';
import MVGQueryLocation from '../API/MVGQueryLocation';


export default class StartSelectScreen extends React.Component {

  constructor(props) {
    super(props);
    this.callback = this.props.navigation.getParam('callback', ()=>{});
    this.query = this.props.navigation.getParam('pre_val', 'Garching, Forschungszentrum');
    this.state = {
      result_list: [],

      last_query: null, 
      last_update: Date.now(),
    };
  }

  componentDidMount() {
    new MVGQueryLocation(this.query).query_location((list) => {
      this.setState((state) => {
        return {
          result_list: list,
          last_query: state.query,
          last_update: Date.now(),
        }
      });
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    const locations = [];
    this.state.result_list.forEach((location) => {
      if(location.type == 'station') {
        locations.push(<Text style={styles.item} onPress={() => {
          this.callback(location);
          this.props.navigation.goBack();
        }
        }>{location.name}</Text>)
      }
    });
    
    return (
      <View style={styles.container}>
        <SearchBar lightTheme onSubmitEditing={(text) => {
          new MVGQueryLocation(text).query_location((list) => {
            this.setState((state) => {
              return {
                last_query: text,
                last_update: Date.now(),
                result_list: list,
              }
            });
          });
        }}
        value={this.query ? this.query.place : ''} placeholder="Bitte eingeben"/>
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
