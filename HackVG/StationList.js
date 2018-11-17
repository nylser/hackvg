import React from 'react';
import {FlatList} from 'react-native';

export default class extends FlatList {

  // list has to be given as a property
  constructor(props){
    props.renderItem = (data) => {
      <Text>{data.name}, {data.place}</Text>
    }
    props.data = props.list;
    super(props);
  }

}
