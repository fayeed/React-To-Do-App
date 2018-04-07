import config from "./firebaseconfig";

// gets the initialized firebase App and gets
// the databse handle
const database = config.database();

// push item to the desired list
// @param id : id of the user
// @param ele : item to inserted in the database
const pushToList = (id, ele) => {
  // creates a regerence to the database
  database
    .ref(`/users/${id}/`)
    .once("value")
    .then(snapshot => {
      // check if the if something is returened
      let todos = snapshot.val() || [];

      // update the list
      todos.list = ele;

      // update the database
      database.ref(`users/${id}/`).set(todos);
    });
};

// remove the item from the desired list
// @param id : id of the user
// @param ele : item to removed in the database
const removeFromList = (id, ele) => {
  // create a reference to the database
  database
    .ref(`/users/${id}/`)
    .once("value")
    .then(snapshot => {
      // check if the if something is returened
      let todos = snapshot.val() || [];

      // update the list
      todos.list = ele;

      // update the database
      database.ref(`users/${id}/`).set(todos);
    });
};

// update the item in th elist
// @param id : id of the user
// @param ele : element to be updated
const updateItem = (id, ele) => {
  // creates a reference to the database
  database
    .ref(`/users/${id}/`)
    .once("value")
    .then(snapshot => {
      // check if the if something is returened
      let todos = snapshot.val() || [];

      // update the list
      todos.list = ele;

      // update the database
      database.ref(`users/${id}/`).set(todos);
    });
};

// reads the list from the database
// @param id : id of the user
// @param callback : callback function takes the list as the argument
//                   called after the list is returned from the database
const readList = (id, callback) => {
  // create a reference to the database
  database
    .ref(`/users/${id}/`)
    .once("value")
    .then(todo => {
      // calls the callback function that updates the state
      callback(todo.val().list);
    });
};

// push list to the databse
// @param id : id of the user
// @param ele : list item to be pushed
const pushList = (id, ele) => {
  // creates a reference to the database
  database
    .ref(`/users/${id}/`)
    .once("value")
    .then(snapshot => {
      // check if undefined is retruned
      let todos = snapshot.val() || null;

      // if so update the items array
      todos.items = todos.items || [];

      // push to the list regardless
      todos.items.push(ele);

      // update the database
      database.ref(`users/${id}/`).set(todos);
    });
};

// remove the list from the databse
// @param id : id of the user
// @param ele : list item to be pushed
const removeList = (id, ele) => {
  // removes the list from the user
  database.ref(`/users/${id}/`).set(ele);
};

// gets the user from the database
// @param email : email of the user
// @param password : password of the user
// @param callback : callback function updates the state
const getUserData = (email, password, callback) => {
  // creates a refrence to the user databse
  // if multiple user are there then order them by email
  database
    .ref("/users/")
    .orderByChild("email")
    .equalTo(email)
    .once("value")
    .then(snapshot => {
      // loops over if multile user are returned
      snapshot.forEach(childSnapshot => {
        // checks if no user exists
        if (childSnapshot.val() === null) {
          return false;
        } else if (
          // if password is wrong
          childSnapshot.val().email !== email &&
          childSnapshot.val().password !== password
        ) {
          return false;
        } else {
          // if everthing passes call the callback function
          // which will update the state
          callback(
            childSnapshot.val().id,
            childSnapshot.val().name,
            childSnapshot.val().email,
            childSnapshot.val().password,
            childSnapshot.val().list
          );

          return true;
        }
      });
    })
    .catch(e => {
      // if an error is retrned handles it
      console.log(e);
    });
};

// gets the user from the database
// @param email : email of the user
// @param name : username of the user
// @param password : password of the user
// @param list : default lis that to be writtrn to the database
// @param callback : callback function updates the state
const writeUserData = (name, email, password, list, callback) => {
  // creates a unique key
  const key = database.ref("/users/").push().key;

  // create the reference to the database
  // and push to the database
  database
    .ref("users/" + key)
    .set({
      id: key,
      email,
      password,
      name,
      list
    })
    .then(
      // if everything works then call the callback function
      callback(key, name, email, password)
    );
};

// export all the functions
export default {
  pushToList,
  removeFromList,
  readList,
  pushList,
  removeList,
  getUserData,
  writeUserData,
  updateItem
};
