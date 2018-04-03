import React, {Component} from "react";
import Input from "../../components/Input/Input";
import { Consumer } from "../../contexts/MyProvider";
import LogIn from "./LogIn/LogIn";
import SignUp from "./SignUp/SignUp";

import classes from "./Authentication.css";

class Authentication extends Component {

  state = {
    active: false
  }

  toggleActive = () => {
    this.setState({active: !this.state.active})
  }

  render () {
    return (
      <Consumer>
        {context => (
          <React.Fragment>
            {context.isSignUpOpen ? (
              <div className={classes.Authentication}>
                <span
                  className={classes.Authentication__close}
                  alt="close button"
                  onClick={context.toggleSignUp}
                />
                {!context.isLoggedIn ? (
                  <div className={classes.Authentication__container}>
                    <LogIn
                      changeEmail={context.changeEmail}
                      changePassword={context.changePassword}
                      getUser={context.getUser}
                      fetchList={context.fetchList}
                    />
                    <SignUp
                      changeName={context.changeName}
                      changeEmail={context.changeEmail}
                      changePassword={context.changePassword}
                      active={this.state.active}
                      addUser={context.addUser}
                      toggleActive={this.toggleActive}
                    />
                  </div>
                ) : (
                  <div className={classes.Authntication__logoutContainer}>
                    <Input
                      type="Logout"
                      onClick={context.toggleLoggedIn}
                      label="Logout"
                    />
                  </div>
                )}
              </div>
            ) : null}
          </React.Fragment>
        )}
      </Consumer>
    );
  }
};

export default Authentication;
