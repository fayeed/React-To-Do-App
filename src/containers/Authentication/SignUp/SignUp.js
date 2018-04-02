import React from "react";
import Input from "../../../components/Input/Input";

import classes from "./SignUp.css";

const SignUp = props => {
  return (
    <div
      className={!props.active ? classes.SignUp : classes.SignUpActive}
      onClick={!props.active ? props.toggleActive : null}
    >
    <i className={props.active ? classes.SignUp__back : null} onClick={props.toggleActive} />
      <h2 className={classes.SignUp__title}>Sign UP</h2>
      <div className={classes.SignUp__inputContainer}>
      <Input
          type="Input"
          onChange={e => props.changeName(e.target.value)}
          modifier="InputElement__input--white"
          placeholder="Name"
          label="Name"
          cat="text"
        />
        <Input
          type="Input"
          onChange={e => props.changeEmail(e.target.value)}
          modifier="InputElement__input--white"
          placeholder="Email"
          label="Email"
          cat="email"
        />
        <Input
          type="Input"
          onChange={e => props.changePassword(e.target.value)}
          modifier="InputElement__input--white"
          placeholder="Password"
          label="Password"
          cat="password"
        />
      </div>
      <Input type="Button" onClick={props.addUser} label="Sign Up" />
    </div>
  );
};

export default SignUp;
