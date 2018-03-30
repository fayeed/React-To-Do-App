import React, { Component } from "react";
import Input from "../InputElement/InputElement";
import Controls from "../Controls/Controls";
import config from "../../firebase/firebaseconfig";

import classes from "./SignUp.css";

// SignUp component for the SideDrawer
class SignUp extends Component {
  state = {
    email: "", // stores the email of the user
    password: "" // stores the password of the user
  };

  database = config.database(); // ref to the database

  // register the user
  writeUserData = (e, email, password) => {
    e.preventDefault();
    email = email.replace(/\./i, "j"); // replace . with j because the parent node cannot conatin . character in its name
    this.props.changeEmail(email); // update the email property in App.js
    // Add in the database
    this.database
      .ref("users/" + email)
      .set({
        email: email,
        password: password
      })
      .then(
        // after complettion update the state
        this.setState({
          email: email,
          password: password
        })
      );
  };

  // authenticate the user
  getUserData = (e, email, password) => {
    e.preventDefault();
    email = email.replace(/\./i, "j");
    this.database
      .ref("/users/" + email)
      .once("value")
      .then(snapshot => {
        // check if we get a match in snapshot
        if (snapshot.val() === null) {
          return false;
        } else if (
          snapshot.val().email !== email &&
          snapshot.val().password !== password
        ) {
          return false;
        } else {
          this.props.changeEmail(email);
          this.setState({
            email: email,
            password: password
          });
          this.props.toggleLogged(); // Update the loggedIn in App.js

          // inflate all the array if thers a match
          this.props.startUpdate("items", (todo, app) =>
            app.setState({ items: todo })
          );
          this.props.startUpdate("completed", (todo, app) =>
            app.setState({ completed: todo })
          );
          this.props.startUpdate("canceled", (todo, app) =>
            app.setState({ canceled: todo })
          );
          return true;
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  // looks for the change in the input value
  inputChanged = (e, id) => {
    e.preventDefault();
    let s = { ...this.state };

    // based on the id update the state
    if (id === "1") {
      s.email = e.target.value;
      this.setState({ ...s });
    } else if (id === "2") {
      s.password = e.target.value;
      this.setState({ ...s });
    }
  };

  render() {
    return (
      <div className={classes.SignUp}>
        <h1>TO-DO LIST</h1>

        {!this.props.logged ? (
          <React.Fragment>
            <form>
              <Input
                id="1"
                type="input"
                name="email"
                content="Email"
                placeholder="Email Address"
                value={this.state.email}
                changed={e => this.inputChanged(e, "1")}
              />

              <Input
                id="1"
                type="input"
                name="password"
                content="Password"
                placeholder="*******"
                value={this.state.password}
                changed={e => this.inputChanged(e, "2")}
              />

              <div className={classes.btns}>
                <Input
                  type="button"
                  label="LogIn"
                  reset={e =>
                    this.getUserData(e, this.state.email, this.state.password)
                  }
                />
                <Input
                  style={{ marginLeft: "2em" }}
                  type="button"
                  label="Register"
                  reset={e =>
                    this.writeUserData(e, this.state.email, this.state.password)
                  }
                />
              </div>
            </form>

            <Controls signout={false} changeTo={this.props.changeTo} />
          </React.Fragment>
        ) : (
          <Controls
            signout={true}
            changeTo={this.props.changeTo}
            logOut={this.props.toggleLogged}
          />
        )}
      </div>
    );
  }
}

export default SignUp;
