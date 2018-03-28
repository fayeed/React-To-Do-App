import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCRaiBxXXQgw9dSyZBIobMkSDgG9CyOZKk",
    authDomain: "react-to-do-list-app.firebaseapp.com",
    databaseURL: "https://react-to-do-list-app.firebaseio.com",
    projectId: "react-to-do-list-app",
    storageBucket: "react-to-do-list-app.appspot.com",
    messagingSenderId: "934647851460"
  };

  firebase.initializeApp(config);

  export default firebase;