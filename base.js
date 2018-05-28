import Rebase from 're-base';
import firebase from 'firebase';
  
var firebaseApp  = firebase.initializeApp({
    apiKey: "AIzaSyAeot5CwqFjhkjh4fffJ3OqSnmtSJ6wzIg",
    authDomain: "battlefeuder.firebaseapp.com",
    databaseURL: "https://battlefeuder.firebaseio.com",
    projectId: "battlefeuder",
    storageBucket: "battlefeuder.appspot.com",
    messagingSenderId: "403439667822"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
