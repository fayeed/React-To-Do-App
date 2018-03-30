import React from "react";

import classes from "./Backdrop.css";

// displays a fullscreen half opacity screen
const Backdrop = props => {
  return <div className={classes.Backdrop} onClick={props.click} />;
};

export default Backdrop;
