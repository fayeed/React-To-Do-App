import React from "react";

import classes from "./Modal.css";

// Modal Container 
const Modal = props => {
  return <div className={classes.Modal}>{props.children}</div>;
};

export default Modal;
