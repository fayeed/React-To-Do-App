import React from "react";
import Input from "../../../components/Input/Input";

import classes from "./LogIn.css";

const LogIn = (props) => {

  const modifier = 'gray';

  return (
    <div className={classes.LogIn}>
      <h2 className={classes.LogIn__title}>Log In</h2>
      <div className={classes.LogIn__inputContainer}>
        <Input
          type="Input"
          onChange={e => props.changeEmail(e.target.value)}
          modifier={modifier}
          placeholder="Email"
          label="Email"
          cat="email"
        />
        <Input
          type="Input"
          onChange={e => props.changePassword(e.target.value)}
          modifier={modifier}
          placeholder="Password"
          label="Password"
          cat="password"
        />
      </div>
        <Input type="Button" modifier={modifier} onClick={props.getUser} label="Log in" />
    </div>
  );
};

export default LogIn;
