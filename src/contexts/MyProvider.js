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
    currentList: 0,
    id: "-L9TOcYFyq7FemF4HQOa",
    name: "fayeed",
    email: "fayeed@live.com",
    password: "draculla52",
    isInputOpen: false,
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
    let no = 0;
    this.state.list.forEach((ele, index) => {
      if (ele.id === id) {
        no = index;
      }
    });

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
    database.default.readList(this.state.id, todo => {
      this.setState({
        list: todo
      });
    });
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

  addItem = (message, category) => {
    const key = firebase.ref("/users/").push().key;
    const ele = {
      id: key,
      message: message,
      category: category,
      completed: false,
      time: this.getDate()
    };
    let s = this.state.list ? [...this.state.list] : [];
    s.forEach((list, index) => {
      if (list.id === category) {
        s[index].items = s[index].items || [];
        s[index].items.push(ele);
      }
    });
    this.setState({
      list: s
    });

    if (this.state.isLoggedIn) {
      database.default.pushToList(this.state.id, s);
    }

    this.setState({
      input: !this.state.input
    });
  };

  removeItem = id => {
    let s = this.state.list ? [...this.state.list] : [];
    s.forEach((list, index) => {
      if (list.id === this.state.list[this.state.currentList].id) {
        s[index].items = s[index].items.filter((ele, i) => ele.id !== id);
      }
    });

    if (this.state.isLoggedIn) {
      database.default.removeFromList(this.state.id, s);
    }

    this.setState({
      list: s
    });
  };

  checkItem = id => {
    let s = this.state.list ? [...this.state.list] : [];

    s.forEach((list, index) => {
      if (list.id === this.state.list[this.state.currentList].id) {
        s[index].items.forEach((ele, i) => {
          if (ele.id === id) {
            ele.completed = !ele.completed;
          }
        });
      }
    });

    if (this.state.isLoggedIn) {
      database.default.updateItem(this.state.id, s);
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

  componentDidMount() {
    this.fetchlist();
  }

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
          getUser: this.getUser,
          checkItem: this.checkItem
        }}
      >
        {this.props.children}{" "}
      </Provider>
    );
  }
}

export default MyProvider;
export { Consumer };
