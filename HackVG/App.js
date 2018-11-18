import React from 'react';
import ConnectionScreen from './connection_screen.js';
import StatusScreen from './status_screen.js';
import CommentScreen from './comment_screen.js';
import {createBottomTabNavigator} from 'react-navigation';
import Ionicons from '@expo/vector-icons';

const App = createBottomTabNavigator({
  Connections: {
    screen: ConnectionScreen,
    /* navigationOptions: {
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return <Ionicons name="retweets" />;
      }
    } */ 
  },
  Status: {
    screen: StatusScreen,
    /* navigationOptions: {
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return <Ionicons name="user"/>
      }
    } */ 
  },
  Comments: {
    screen: CommentScreen,
    /* navigationOptions: {
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return <Ionicons name="comment"/>
      }
  } */
  },
}, {initialRouteName: 'Status'});

export default App;