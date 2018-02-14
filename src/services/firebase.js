import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyDBUWkLU44oRXGTGBJOYX0smZ6gK_PBVWc',
  authDomain: 'trekker-c9c2e.firebaseapp.com',
  databaseURL: 'https://trekker-c9c2e.firebaseio.com',
  projectId: 'trekker-c9c2e',
  storageBucket: 'trekker-c9c2e.appspot.com',
  messagingSenderId: '952385214445'
};

firebase.initializeApp(config);

export default {
  database: firebase.database(),
  fb: firebase
};
