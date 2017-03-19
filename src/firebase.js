import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyA8EoMRRgMj80CZG_1P8_W7kKm2AZXLk6s',
  authDomain: 'lunch-rush-475bd.firebaseapp.com',
  databaseURL: 'https://lunch-rush-475bd.firebaseio.com',
  storageBucket: 'lunch-rush-475bd.appspot.com',
  messagingSenderId: '616407598799'
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
