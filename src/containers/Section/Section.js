import React from "react";
import { Consumer } from "../../contexts/MyProvider";
import SectonItem from "../../components/SectionItem/SectionItem";

import classes from "./Section.css";

const Section = () => {
  let items = null;

  return (
    <Consumer>
      {context => (
        <div className={classes.Section}>
          <h3 className={classes.Section__title}>Lists{console.log(context)}</h3>
          <div className={classes.Section__container}>
            {
              (items = context.list.map(ele => {
                return (
                  <SectonItem
                    key={ele.id}
                    id={ele.id}
                    click={() => context.changeCurrentList(ele.id)}
                    remove={() => context.removeList(ele.id)}
                    type="indicator"
                    name={ele.name}
                    length={ele.items ? ele.items.length : 0}
                  />
                );
              }))
            }
            <SectonItem
              click={context.toggleAddList}
              type="add"
              name={"New List"}
            />
          </div>
        </div>
      )}
    </Consumer>
  );
};

export default Section;
