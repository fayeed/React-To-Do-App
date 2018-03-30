import React, { Component } from "react";
import MainList from "../MainList/MainList";
import InputModal from "../InputModal/InputModal";
import SideDrawer from "../SideDrawer/SideDrawer";
import config from "../../firebase/firebaseconfig";
import Input from "../../components/InputElement/InputElement";

import "./App.css";

class App extends Component {
  // State for the whole App
  state = {
    items: [], // holds all the add items
    completed: [], // holds the completed items
    canceled: [], // incomplete items
    isLoggedIn: false, // flag to check if the user is loggedIn used for adding to database
    email: "", // holds email address : It's a reference key for user in firebase
    current: 1, // current dispplayed list [items / completed / canceled]
    input: false // input show flag
  };

  database = config.database(); // hold the reference to the firebase database

  //------------------------------------------------------
  //
  // All the functions that update the state in some way
  // might also call other functions for updating database
  //
  //------------------------------------------------------

  // toggles the input state
  toggleInput = () => {
    this.setState({
      input: !this.state.input
    });
  };

  // chnages the email state
  changeEmail = email => {
    this.setState({ email });
  };

  // changes the current state
  changeList = i => {
    this.setState({ current: i });
  };

  // toggles the isLogged state
  toggleLogged = () => {
    this.setState({ isLoggedIn: !this.state.isLoggedIn });
  };

  // remove the items from the list and move it to the specified list
  // also if loggedIn also remove it from database
  removeItem = (id, type) => {
    let i = [...this.state.items].filter(ele => ele.id !== id); // create new list except the one to be removed
    let s = [...this.state[type]];
    let filtered = [...this.state.items].filter(ele => ele.id === id)[0]; // get the item to be removed
    s.push(filtered); // add it to the canceled list

    // if logged perform remove and add operations in firebase
    // either way update the state
    if (this.state.isLoggedIn) {
      this.pushList(filtered, type);
      this.removeList(id, "items");
      this.setState({ type: s, items: i });
    } else {
      this.setState({ type: s, items: i });
    }
  };

  // add the item to the items list
  // if loggedIn push it to the firebase
  addItem = (e, ele) => {
    e.preventDefault();
    let s = this.state.items ? [...this.state.items] : []; // check if the items is null of undefined
    s.push(ele);
    this.setState({ items: s });

    if (this.state.isLoggedIn) {
      this.pushList(ele, "items");
    }

    this.setState({ input: !this.state.input }); // element updated close the input Modal
  };

  // push the item to its specified location
  pushList = (ele, type) => {
    this.database
      .ref(`/users/${this.state.email}/${type}`)
      .once("value")
      .then(todo => {
        let todos = todo.val() || [];

        const d = new Date();

        todos.push({
          id: ele.id,
          message: ele.message,
          category: ele.category,
          time: `${d.getDate()}/${d.getMonth()}/${d.getFullYear}`,
          urgency: ele.urgency
        });

        this.database.ref(`users/${this.state.email}/${type}`).set(todos);
        console.log("complete");
      });
  };

  // remove the item form the firebase database
  removeList = (id, type) => {
    // check if any node has the specified ID and returns it as snapshot
    this.database
      .ref(`/users/${this.state.email}/${type}`)
      .orderByChild("id")
      .equalTo(id)
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          // remove's the element from the firebase
          this.database
            .ref(`/users/${this.state.email}/${type}`)
            .child(childSnapshot.key)
            .remove();
        });
      });
  };

  // reads the list from the firebase databse could be [items / completed / canceled]
  readList = (type, callback) => {
    this.database
      .ref(`/users/${this.state.email}/${type}`)
      .once("value")
      .then(todo => {
        callback(todo.val(), this); // callback function that updates the state of the App.js
      });
  };

  // OnMount update the state
  componentDidMount() {
    this.readList("items", todo => this.setState({ items: todo }));
    this.readList("completed", todo => this.setState({ completed: todo }));
    this.readList("canceled", todo => this.setState({ canceled: todo }));
  }

  render() {
    let items = this.state.items;

    // set the current list from the state and the
    // it to that list for passing it to the MainList
    if (this.state.current === 1) {
      items = this.state.items;
    } else if (this.state.current === 2) {
      items = this.state.completed;
    } else if (this.state.current === 3) {
      items = this.state.canceled;
    }

    return (
      <main>
        <MainList items={items} remove={this.removeItem} />

        <SideDrawer
          changeTo={this.changeList}
          logged={this.state.isLoggedIn}
          toggleLogged={this.toggleLogged}
          changeEmail={this.changeEmail}
          startUpdate={this.readList}
        />

        <InputModal
          click={this.toggleInput}
          input={this.state.input}
          addItem={this.addItem}
        />

        <Input label="open" type="inputBtn" reset={this.toggleInput} />
      </main>
    );
  }
}

export default App;
