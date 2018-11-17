import React from 'react';
import firebase from 'firebase';
import ConnectionScreen from './connection_screen.js';
import StatusScreen from './status_screen.js';
import CommentScreen from './comment_screen.js';
import {createBottomTabNavigator} from 'react-navigation';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDsFS7_QW0ccKZBWxBIj25yNBhgYPgrQdE",
  authDomain: "hackvg1-16762.firebaseapp.com",
  databaseURL: "https://hackvg1-16762.firebaseio.com",
  projectId: "hackvg1-16762",
  storageBucket: "hackvg1-16762.appspot.com",
  messagingSenderId: "235022246674"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const App = createBottomTabNavigator({
  Connections: {screen: ConnectionScreen},
  Status: {screen: StatusScreen},
  Comments: {screen: CommentScreen},
}, {initialRouteName: 'Status'});

export default App;