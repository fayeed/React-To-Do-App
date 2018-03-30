import React from "react";
import Item from "../../components/Item/Item";

import classes from "./MainList.css";

const MainList = props => {
  // creates a list of JSX items to display
  // if no items are received then return null
  const items =
    props.items !== null
      ? props.items.map(ele => {
          return (
            <Item
              message={ele.message}
              category={ele.category}
              time={ele.time}
              key={ele.id}
              id={ele.id}
              remove={props.remove}
            />
          );
        })
      : null;

  return <div className={classes.MainList}>{items}</div>;
};

export default MainList;
