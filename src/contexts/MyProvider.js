import React, { Component } from "react";
import * as database from "../firebase/database";
import config from "../firebase/firebaseconfig";

const firebase = config.database();

const { Provider, Consumer } = React.createContext();

class MyProvider extends Component {
  state = {
    list: [
      {
        id: "0",
        name: "Default",
        color: 1,
        items: [],
        date: this.getDate()
      }
    ],
    currentList: "",
    id: "",
    name: "",
    email: "",
    password: "",
    isInputOpen: true,
    isSignUpOpen: false,
    isAddListOpen: false,
    isLoggedIn: false
  };

  getDate() {
    const d = new Date();
    return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
  }

  changeID = id => {
    this.setState({
      id
    });
  };

  changeEmail = email => {
    this.setState({
      email
    });
  };

  changeName = name => {
    this.setState({
      name
    });
  };

  changePassword = password => {
    this.setState({
      password
    });
  };

  changeCurrentList = id => {
    this.setState({
      currentList: id
    });
  };

  toggleInput = () => {
    this.setState({
      isInputOpen: !this.state.isInputOpen
    });
  };

  toggleSignUp = () => {
    this.setState({
      isSignUpOpen: !this.state.isSignUpOpen
    });
  };

  toggleAddList = () => {
    this.setState({
      isAddListOpen: !this.state.isAddListOpen
    });
  };

  toggleLoggedIn = () => {
    if (this.state.isLoggedIn) {
      this.setState({
        id: "",
        email: "",
        name: "",
        password: "",
        isLoggedIn: false
      });
    } else {
      this.setState({
        isLoggedIn: true
      });
    }
  };

  fetchlist = () => {
    database.default.readList(
      this.state.id,
      todo => {
        this.setState({
          List: todo
        });
      }
    );
  };

  addList = name => {
    let s = !this.state.items ? [...this.state.list] : [];
    const d = new Date();
    const key = firebase.ref(`/users/`).push().key;
    const list = {
      id: key,
      name: name,
      items: [],
      color: Math.floor(Math.random() * 4 + 1),
      time: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
    };
    s.push(list);
    if (this.state.isLoggedIn) {
      database.default.pushList(this.state.id, list);
    }

    this.setState({
      list: s
    });
  };

  removeList = id => {
    let i = [...this.state.list].filter(ele => ele.id !== id);

    let ele = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    ele.list = i;

    if (this.state.isLoggedIn) {
      database.default.removeList(this.state.id, ele);
    }

    this.setState({
      list: i
    });
  };

  addItem = (id, ele, listID) => {
    let s = this.state.list ? [...this.state.list] : [];
    s.forEach((list, index) => {
      if (list.id === listID) {
        s[index].items.push(ele);
      }
    });
    this.setState({
      list: s
    });

    if (this.state.isLoggedIn) {
      database.default.pushToList(this.state.email, ele, id);
    }

    this.setState({
      input: !this.state.input
    });
  };

  removeItem = (id, listID) => {
    let s = this.state.items ? [...this.state.list] : [];
    s.forEach((list, index) => {
      if (list.id === listID) {
        s[index].items = s[index].items.filter((ele, i) => ele);
      }
    });

    if (this.state.isLoggedIn) {
      database.default.removeFromList(this.state.id, id);
    }

    this.setState({
      list: s
    });
  };

  getUser = () => {
    if (!this.state.isLoggedIn && this.state.isSignUpOpen) {
      database.default.getUserData(
        this.state.email,
        this.state.password,
        (id, name, email, password, list) => {
          console.log(list);
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

  addUser = () => {
    if (!this.state.isLoggedIn && this.state.isSignUpOpen) {
      const d = new Date();
      const list = [
        {
          id: "0",
          name: "Default",
          color: 1,
          items: [],
          date: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
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
          getUser: this.getUser
        }}
      >
        {this.props.children}{" "}
      </Provider>
    );
  }
}

export default MyProvider;
export { Consumer };
