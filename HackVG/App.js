import React from 'react';
import ConnectionScreen from './connection_screen.js';
import StatusScreen from './status_screen.js';
import CommentScreen from './comment_screen.js';
import {createBottomTabNavigator} from 'react-navigation';
import { Ionicons } from 'react-native-vector-icons/Ionicons';

const App = createBottomTabNavigator({
  Connections: {screen: ConnectionScreen},
  Status: {screen: StatusScreen},
  Comments: {screen: CommentScreen},
}, {
  initialRouteName: 'Status', 
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName = `user`;
      if (routeName === 'Status') {
        iconName = `user`;
      } else if (routeName === 'Comments') {
        iconName = `comments-o`;
      } else if (routeName === 'Connections'){
        iconName = `retweet`;
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
    },
})});

export default App;