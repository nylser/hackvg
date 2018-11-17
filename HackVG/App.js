import React from 'react';
import ConnectionScreen from './connection_screen.js';
import StatusScreen from './status_screen.js';
import CommentScreen from './comment_screen.js';
import {createBottomTabNavigator} from 'react-navigation';

const App = createBottomTabNavigator({
  Connections: {screen: ConnectionScreen},
  Status: {screen: StatusScreen},
  Comments: {screen: CommentScreen},
});

export default App;