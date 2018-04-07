import React from "react";
import { Consumer } from "../../contexts/MyProvider";
import classes from "./Header.css";
import userIcon from "../../assets/svg/user.svg";

const Header = () => {
  return (
    <Consumer>
      {context => (
        <header className={classes.header}>
          <h1 className={classes.header__title}>Nova</h1>
          <img
            className={classes.header__userIcon}
            src={userIcon}
            alt="user icon"
            onClick={context.toggleSignUp}
          />
        </header>
      )}
    </Consumer>
  );
};

export default Header;
