import * as firebase from "firebase";

// config file for firebase holds all the token and addresses
// Update the file before running the application
const config = {
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  projectId: "<PROJECT_ID>",
  storageBucket: "<BUCKET>.appspot.com",
  messagingSenderId: "<SENDER_ID>"
};

// intialize the firebase App
firebase.initializeApp(config);

// export the firebase app for use
export default firebase;
