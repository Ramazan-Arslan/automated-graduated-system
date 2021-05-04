import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAP--lBXgxtFgxYLetw8fDza3sjsXjXb18",
  authDomain: "automated-graduation-system.firebaseapp.com",
  projectId: "automated-graduation-system",
  storageBucket: "automated-graduation-system.appspot.com",
  messagingSenderId: "695452591570",
  appId: "1:695452591570:web:00c7c0fc88f6f8890e140b",
  measurementId: "G-2ZGL6HJ7E6"
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
export const timestamp = firebase.database.ServerValue.TIMESTAMP;