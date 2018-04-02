import React, { Component } from "react";
import * as database from "../firebase/database";
import * as firebase from "firebase";

const { Provider, Consumer } = React.createContext();

class MyProvider extends Component {
  state = {
    list: [],
    currentlist: "",
    id: "",
    name: "",
    email: "",
    password: "",
    isInputOpen: false,
    isSignUpOpen: true,
    isLoggedIn: false
  };

  chanheID = id => {
    this.setState({ id });
  };

  changeEmail = email => {
    this.setState({ email });
  };

  changeName = name => {
    this.setState({ name });
  };

  changePassword = password => {
    this.setState({ password });
  };

  toggleInput = () => {
    this.setState({ isInputOpen: !this.state.isInputOpen });
  };

  toggleSignUp = () => {
    this.setState({ isSignUpOpen: !this.state.isSignUpOpen });
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
      this.setState({ isLoggedIn: true });
    }
  };

  fetchlist = () => {
    database.default.readList(this.state.email, todo =>
      this.setState({ list: todo })
    );
  };

  addList = ele => {
    let s = this.state.items ? [...this.state.list] : [];
    const key = firebase.ref(`/users/${this.state.id}/list/`).push().key;
    ele.id = key;
    s.push(ele);
    if (this.state.isLoggedIn) {
      database.default.pushList(this.state.id, ele);
    }

    this.setState({ list: s });
  };

  removeList = (id, ele) => {
    let i = [...this.state.list].filter(ele => ele.id !== id);

    if (this.state.isLoggedIn) {
      database.default.removeList(this.state.id, id);
    }

    this.setState({ list: i });
  };

  addItem = (id, ele, listID) => {
    let s = this.state.items ? [...this.state.list] : [];
    s.forEach((list, index) => {
      if (list.id === listID) {
        s[index].items.push(ele);
      }
    });
    this.setState({ list: s });

    if (this.state.isLoggedIn) {
      database.default.pushToList(this.state.email, ele, id);
    }

    this.setState({ input: !this.state.input });
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

    this.setState({ list: s });
  };

  getUser = () => {
    if (!this.state.isLoggedIn && this.state.isSignUpOpen) {
      database.default.getUserData(
        this.state.email,
        this.state.password,
        (id, name, email, password) =>
          this.setState({
            id,
            name,
            email,
            password,
            isLoggedIn: true,
            isSignUpOpen: false
          })
      );
    }
  };

  addUser = () => {
    if (!this.state.isLoggedIn && this.state.isSignUpOpen) {
      database.default.writeUserData(
        this.state.name,
        this.state.email,
        this.state.password,
        (id, name, email, password) =>
          this.setState({
            id,
            name,
            email,
            password,
            isLoggedIn: true,
            isSignUpOpen: false
          })
      );
    }
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          changeEmail: this.changeEmail,
          changeName: this.changeName,
          changePassword: this.changePassword,
          toggleInput: this.toggleInput,
          toggleLoggedIn: this.toggleLoggedIn,
          toggleSignUp: this.toggleSignUp,
          fetchList: this.fetchlist,
          addItem: this.addItem,
          removeItem: this.removeItem,
          addUser: this.addUser,
          getUser: this.getUser
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default MyProvider;
export { Consumer };
