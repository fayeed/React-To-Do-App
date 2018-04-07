import React from "react";
import { Consumer } from "../../contexts/MyProvider";
import Item from "../../components/Item/Item";

import classes from "./MainList.css";

// mainlist hold all the list item
const MainList = () => {
  let items = null;

  return (
    <Consumer>
      {context => (
        <React.Fragment>
          <div className={classes.MainList}>
            <p className={classes.MainList__greetings}>
              Hello, {context.name} <br />
              <span>here's whats on your list</span>
            </p>
            {context.list.length > 0 ? (
              (items = context.list[context.currentList].items.map(ele => {
                return (
                  <Item
                    key={ele.id}
                    id={ele.id}
                    time={ele.time}
                    completed={ele.completed}
                    message={ele.message}
                    checkItem={context.checkItem}
                    removeItem={context.removeItem}
                  />
                );
              }))
            ) : (
              <p className={classes.MainList__noItem}>
                No Items added Please add by clicking on the add button.
              </p>
            )}
          </div>
        </React.Fragment>
      )}
    </Consumer>
  );
};

export default MainList;
