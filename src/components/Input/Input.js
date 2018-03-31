import React from "react";

import classes from "./Input.css";

const Input = props => {
  let InputElement = null;

  switch (props.type) {
    case "Input":
      InputElement = (
        <React.Fragment>
          <input
            type={props.cat}
            className={classes.InputElement__input}
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
          />
           <label className={classes.InputElement__label}>{props.label}</label>
        </React.Fragment>
      );
      break;

    case "Select":
      InputElement = null;
      break;

    case "Button":
      InputElement = (
        <button
          className={classes.InputElement__button}
          onClick={props.onClick}
        >
          {props.label}
        </button>
      );
      break;

    case "Logout":
      InputElement = (
        <button
          className={classes.InputElement__logout}
          onClick={props.onClick}
        >
          {props.label}
        </button>
      );
      break;
    default:
      break;
  }

  return <div className={classes.InputElement}>{InputElement}</div>;
};

export default Input;
