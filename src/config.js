import firebase from 'firebase';

export const DB_CONFIG = {
  apiKey: "AIzaSyAQbvE9fsHCN7XdM8Hr74Ii6UDGehk1zsw",
  authDomain: "todo-533f5.firebaseapp.com",
  databaseURL: "https://todo-533f5.firebaseio.com",
  projectId: "todo-533f5",
  storageBucket: "todo-533f5.appspot.com",
  messagingSenderId: "235097657150"
  };

  firebase.initializeApp(DB_CONFIG);

export const firebaseAuth = firebase.auth;