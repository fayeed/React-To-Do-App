import React from "react";

import classes from "./SectionItem.css";

const SectionItem = props => {
  let item = null;

  switch (props.type) {
    case "indicator":
      item = (
        <React.Fragment>
          <div
            onClick={props.remove}
            className={classes.SectionItem__indicator}
          />
          <div className={classes.SectionItem__container}>
            <p className={classes.SectionItem__title}>{props.name}</p>
            <p className={classes.SectionItem__tasks}>{props.length} tasks</p>
          </div>
        </React.Fragment>
      );
      break;
    case "add":
      item = (
        <React.Fragment>
          <div className={classes.SectionItem__add} />
          <div className={classes.SectionItem__container}>
            <p className={classes.SectionItem__title}>{props.name}</p>
          </div>
        </React.Fragment>
      );
      break;
    default:
      break;
  }

  return (
    <div
      onClick={props.click}
      key={props.id}
      className={
        props.type === "add"
          ? [classes.SectionItem, classes["SectionItem--gray"]].join(" ")
          : [classes.SectionItem, classes["SectionItem--white"]].join(" ")
      }
    >
      {item}
    </div>
  );
};

export default SectionItem;
