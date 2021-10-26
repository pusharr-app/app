import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC6i9N_mcLe8HuZym1LTiwKTTKv9Yuu6yA',
  authDomain: 'pusharr.firebaseapp.com',
  databaseURL: 'https://pusharr-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'pusharr',
  storageBucket: 'pusharr.appspot.com',
  messagingSenderId: '968201621249',
  appId: '1:968201621249:web:fd02541ba72221d6015500',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
