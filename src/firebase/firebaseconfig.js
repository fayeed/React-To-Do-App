import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyDu2A0YMVZxHbLVXpWObsZ26VBS977zF1U",
  authDomain: "react-to-do-list-app-b6425.firebaseapp.com",
  databaseURL: "https://react-to-do-list-app-b6425.firebaseio.com",
  projectId: "react-to-do-list-app-b6425",
  storageBucket: "",
  messagingSenderId: "581199972557"
};

firebase.initializeApp(config);

export default firebase;
