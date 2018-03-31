import config from "./firebaseconfig";

const database = config.database();

const pushToList = (id, ele, listID) => {
  database
    .ref(`/users/${id}/list/`)
    .orderByChild('id')
    .equalTo(listID)
    .once("value")
    .then(snapshot => {
      snapshot.forEach(childSnapshot => {
      let todos = childSnapshot.val() || [];

      const d = new Date();

      todos.items.push({
        id: ele.id,
        message: ele.message,
        category: ele.category,
        completed: false,
        time: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
      });

      database.ref(`users/${id}/list/`).orderByChild('id')
      .equalTo(listID).set(todos);
      console.log("complete");
    });
  });
};

const removeFromList = (id, itemId) => {
  database
    .ref(`/users/${id}/list/`)
    .orderByChild("id")
    .equalTo(itemId)
    .once("value")
    .then(snapshot => {
      snapshot.forEach(childSnapshot => {
        database
          .ref(`/users/${id}/list/`)
          .orderByChild("id")
          .equalTo(itemId)
          .child(childSnapshot.key)
          .remove();
      });
    });
};

const readList = (id, callback) => {
  database
    .ref(`/users/${id}/list/`)
    .once("value")
    .then(todo => {
      callback(todo.val());
    });
};

const pushList = (id, ele) => {
  database
    .ref(`/users/${id}/list/`)
    .once("value")
    .then(todo => {

      const d = new Date();
      const list = {
        id: ele.id,
        name: ele.name,
        items: [],
        time: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
      }

      todo.push(list)

      database.ref(`users/${id}/list/`).set(todo);
      console.log("complete");
    });
}

const removeList = (id, itemId) => {
  database
    .ref(`/users/${id}/list/`)
    .orderByChild("id")
    .equalTo(itemId)
    .once("value")
    .then(snapshot => {
      snapshot.forEach(childSnapshot => {
        database
          .ref(`/users/${id}/list/`)
          .child(childSnapshot.key)
          .remove();
      });
    });
};

const getUserData = (email, password, callback) => {
  database
    .ref("/users/")
    .orderByChild("email")
    .equalTo(email)
    .once("value")
    .then(snapshot => {
      snapshot.forEach(childSnapshot => {
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
            childSnapshot.val().password
          );

          return true;
        }
      });
    })
    .catch(e => {
      console.log(e);
    });
};

const writeUserData = (name, email, password, callback) => {
  
  const key = database.ref('/users/').push().key;

  database
    .ref("users/" + key)
    .set({
      id: key,
      email,
      password,
      name
    })
    .then(callback(key, name, email, password));
};

export default { pushToList, removeFromList, readList, pushList, removeList, getUserData, writeUserData };