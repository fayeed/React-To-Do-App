import React from "react";
import Input from "../../components/Input/Input";
import { Consumer } from "../../contexts/MyProvider";

import classes from "./SignUp.css";
import close from "../../assets/svg/close.svg";

const SignUp = () => {
  return (
    <Consumer>
      {context => (
        <React.Fragment>
          {context.isSignUpOpen ? (
            <div className={classes.SignUp}>
              <img
                className={classes.SignUp__close}
                src={close}
                alt="close button"
                onClick={context.toggleSignUp}
              />
              {!context.isLoggedIn ? (
                <React.Fragment>
                  <h2 className={classes.SignUp__title}>Sign up</h2>
                  <div className={classes.SignUp__inputContainer}>
                    <Input
                      type="Input"
                      onChange={e => context.changeEmail(e.target.value)}
                      placeholder="Email"
                      label="Email"
                      cat="email"
                    />
                    <Input
                      type="Input"
                      onChange={e => context.changeEmail(e.target.value)}
                      placeholder="Password"
                      label="Password"
                      cat="password"
                    />
                  </div>
                  <div className={classes.SignUp__btnContainer}>
                    <Input
                      type="Button"
                      onClick={context.getUser}
                      label="Log in"
                    />
                    <Input
                      type="Button"
                      onClick={context.addUser}
                      label="Register"
                    />
                  </div>
                </React.Fragment>
              ) : (
                <div className={classes.SignUp__logoutContainer}>
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
};

export default SignUp;
