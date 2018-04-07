import React from "react";

import { Consumer } from "../../contexts/MyProvider";

import classes from "./SideButton.css";

const Sidebutton = () => {
  return (
    <Consumer>
      {context => (
        <div className={classes.Sidebutton} onClick={context.toggleInput}>
          <i className={classes.Sidebutton__icon} />
        </div>
      )}
    </Consumer>
  );
};

export default Sidebutton;
