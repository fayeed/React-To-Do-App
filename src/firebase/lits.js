import config from './firebaseconfig';

var database = config.database();

const pushList = (list, type) => {
    database.ref(`users/${type}/`).set({
      list
    });
}