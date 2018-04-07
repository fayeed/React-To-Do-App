import config from "./firebaseconfig";

const database = config.database();

const pushToList = (id, ele) => {
  database
    .ref(`/users/${id}/`)
    .once("value")
    .then(snapshot => {
        let todos = snapshot.val() || [];

        todos.list  = ele

        database.ref(`users/${id}/`).set(todos);
        console.log("complete");
    });
};

const removeFromList = (id, ele) => {
  database
    .ref(`/users/${id}/`)
    .once("value")
    .then(snapshot => {
      let todos = snapshot.val() || [];
      todos.list = ele
        database
          .ref(`/users/${id}/`).set(todos)
    });
};

const updateItem = (id, ele) => {
  database
    .ref(`/users/${id}/`)
    .once("value")
    .then(snapshot => {
      let todos = snapshot.val() || [];
      todos.list = ele
        database
          .ref(`/users/${id}/`).set(todos)
    });
};

const readList = (id, callback) => {

  database
    .ref(`/users/${id}/`)
    .once("value")
    .then(todo => {
      console.log('error',todo.val())
      callback(todo.val().list);
    });
};

const pushList = (id, ele) => {

  database
    .ref(`/users/${id}/`)
    .once("value")
    .then(snapshot => {
      let todos = snapshot.val() || null;
      todos.items = todos.items || []

      todos.items.push(ele);

      database.ref(`users/${id}/`).set(todos);
      console.log("complete");
    });

}

const removeList = (id, ele) => {
  database
    .ref(`/users/${id}/`)
    .set(ele);
};

const getUserData = (email, password, callback) => {

  database
    .ref("/users/")
    .orderByChild("email")
    .equalTo(email)
    .once("value")
    .then(snapshot => {
      snapshot.forEach(childSnapshot => {
        console.log(childSnapshot.val())
        if (childSnapshot.val() === null) {
          return false;
        } else if (
          childSnapshot.val().email !== email &&
          childSnapshot.val().password !== password
        ) {
          return false;
        } else {
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
      console.log(e);
    });
};

const writeUserData = (name, email, password, list, callback) => {

  const key = database.ref('/users/').push().key;

  database
    .ref("users/" + key)
    .set({
      id: key,
      email,
      password,
      name,
      items: list
    })
    .then(callback(key, name, email, password));
};

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