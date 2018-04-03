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
    .ref(`/list/`)
    .orderByChild("useID")
    .equalTo(id)
    .once("value")
    .then(todo => {
      todo.forEach(t => {
        console.log(t)
      })

      //callback(todo.val());
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
            childSnapshot.val().items
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
      list
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
  writeUserData
};