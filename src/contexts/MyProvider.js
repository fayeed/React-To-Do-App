import React, { Component } from "react";
import * as database from "../firebase/database";
import config from "../firebase/firebaseconfig";

// get the database connection object
const firebase = config.database();

// create a new Context and Deconstruct it
const { Provider, Consumer } = React.createContext();

class MyProvider extends Component {
  // holds all the application state
  state = {
    // all teh list are kept here
    list: [
      {
        id: "0",
        name: "Default",
        color: 1,
        items: [],
        date: this.getDate()
      }
    ],
    currentList: 0, // current opened list
    id: "", // id of the user
    name: "", // username of the user
    email: "", // email of the user
    password: "", // password of the user
    isInputOpen: false, // flag to check if input container is open
    isSignUpOpen: false, // flag to check if auth container is open
    isAddListOpen: false, // flag to check if addList container is open
    isLoggedIn: false // flag to check if user is logged in
  };

  // return current date converted to string
  getDate() {
    // intialzie te Date object
    const d = new Date();

    // retturns the date converted to string
    return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
  }

  // changes the id state on onChange
  changeID = id => {
    this.setState({
      id
    });
  };

  // changes the email state on onChange
  changeEmail = email => {
    this.setState({
      email
    });
  };

  // changes the name state on onChange
  changeName = name => {
    this.setState({
      name
    });
  };

  // changes the password state on onChange
  changePassword = password => {
    this.setState({
      password
    });
  };

  // change the currentList index
  changeCurrentList = id => {
    let no = 0; // initialize the index variable

    // loop over the lis
    this.state.list.forEach((ele, index) => {
      // if ID matched update the index variable
      if (ele.id === id) {
        no = index;
      }
    });

    // update the state
    this.setState({
      currentList: no
    });
  };

  // toggles the state isInputOpen flag
  toggleInput = () => {
    this.setState({
      isInputOpen: !this.state.isInputOpen
    });
  };

  // toggles the state isSIgnUpOpen flag
  toggleSignUp = () => {
    this.setState({
      isSignUpOpen: !this.state.isSignUpOpen
    });
  };

  // toggles the state toggleAddList flag
  toggleAddList = () => {
    this.setState({
      isAddListOpen: !this.state.isAddListOpen
    });
  };

  // toggles the state isLoggedIn flag
  // and also update id, email, name, password, isSignUpOpen
  toggleLoggedIn = () => {
    if (this.state.isLoggedIn) {
      this.setState({
        id: "",
        email: "",
        name: "",
        password: "",
        isLoggedIn: false,
        isSignUpOpen: false
      });
    } else {
      this.setState({
        isLoggedIn: true
      });
    }
  };

  // get the list from the database
  fetchlist = () => {
    database.default.readList(this.state.id, todo => {
      this.setState({
        list: todo
      });
    });
  };

  // add the list to the list state and
  // also updates the database
  addList = name => {
    // check if list is empty
    let s = !this.state.list ? [...this.state.list] : [];

    // creates a unqiue keu
    const key = firebase.ref(`/users/`).push().key;

    // initialize the new list object
    const list = {
      id: key,
      name: name,
      items: [],
      color: Math.floor(Math.random() * 4 + 1),
      time: this.getDate()
    };

    // push to the list object
    s.push(list);

    // check if logged in
    if (this.state.isLoggedIn) {
      // update the datase
      database.default.pushList(this.state.id, list);
    }

    // updates the state
    this.setState({
      list: s
    });
  };

  // remove tle list from the database
  // and update the state
  removeList = id => {
    // filer the list state object
    // by checking if teh ID matches
    let i = [...this.state.list].filter(ele => ele.id !== id);

    // create the default use object
    let ele = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    // set the new list to the filtered one
    ele.list = i;

    // checks if user is logged in
    if (this.state.isLoggedIn) {
      // update the database
      database.default.removeList(this.state.id, ele);
    }

    // update the state
    this.setState({
      list: i
    });
  };

  // add item to the list
  addItem = (message, category) => {
    // creates unique key
    const key = firebase.ref("/users/").push().key;

    // create the object
    const ele = {
      id: key,
      message: message,
      category: category,
      completed: false,
      time: this.getDate()
    };

    // cherck if list exists
    let s = this.state.list ? [...this.state.list] : [];

    // loop over and add the item
    s.forEach((list, index) => {
      if (list.id === category) {
        s[index].items = s[index].items || [];
        s[index].items.push(ele);
      }
    });

    // update the state
    this.setState({
      list: s,
      isInputOpen: !this.state.isInputOpen
    });

    // update the database
    if (this.state.isLoggedIn) {
      database.default.pushToList(this.state.id, s);
    }
  };

  // remove the item from the list
  // and also from the the database
  removeItem = id => {
    // gets the list object
    let s = this.state.list ? [...this.state.list] : [];

    // loop over the list
    s.forEach((list, index) => {
      // if match found then filter the element
      if (list.id === this.state.list[this.state.currentList].id) {
        s[index].items = s[index].items.filter((ele, i) => ele.id !== id);
      }
    });

    // update the database
    if (this.state.isLoggedIn) {
      database.default.removeFromList(this.state.id, s);
    }

    // update the state
    this.setState({
      list: s
    });
  };

  // check the tem as completed
  checkItem = id => {
    // get the list
    let s = this.state.list ? [...this.state.list] : [];

    // loop over the list
    s.forEach((list, index) => {
      // set as complete if the item is matched
      if (list.id === this.state.list[this.state.currentList].id) {
        s[index].items.forEach((ele, i) => {
          if (ele.id === id) {
            ele.completed = !ele.completed;
          }
        });
      }
    });

    // update the databse
    if (this.state.isLoggedIn) {
      database.default.updateItem(this.state.id, s);
    }

    // update teh state
    this.setState({
      list: s
    });
  };

  // get the user from the user
  // and update the state
  getUser = () => {
    if (!this.state.isLoggedIn && this.state.isSignUpOpen) {
      database.default.getUserData(
        this.state.email,
        this.state.password,
        (id, name, email, password, list) => {
          this.setState({
            id,
            name,
            email,
            password,
            isLoggedIn: true,
            isSignUpOpen: false,
            list: list
          });
        }
      );
    }
  };

  // add User to teh database
  // update the state
  addUser = () => {
    if (!this.state.isLoggedIn && this.state.isSignUpOpen) {
      const list = [
        {
          id: "0",
          name: "Default",
          color: 1,
          items: [],
          date: this.getDate()
        }
      ];

      database.default.writeUserData(
        this.state.name,
        this.state.email,
        this.state.password,
        list,
        (id, name, email, password) => {
          this.setState({
            id,
            name,
            email,
            password,
            isLoggedIn: true,
            isSignUpOpen: false,
            list: list
          });
        }
      );
    }
  };

  render() {
    return (
      <Provider
        value={{
          // pass all the state and methods as props
          ...this.state,
          chnageID: this.chnageID,
          changeEmail: this.changeEmail,
          changeName: this.changeName,
          changePassword: this.changePassword,
          changeCurrentList: this.changeCurrentList,
          toggleInput: this.toggleInput,
          toggleLoggedIn: this.toggleLoggedIn,
          toggleSignUp: this.toggleSignUp,
          toggleAddList: this.toggleAddList,
          fetchList: this.fetchlist,
          addList: this.addList,
          removeList: this.removeList,
          addItem: this.addItem,
          removeItem: this.removeItem,
          addUser: this.addUser,
          getUser: this.getUser,
          checkItem: this.checkItem
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default MyProvider;
export { Consumer };
