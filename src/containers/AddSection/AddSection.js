import React from "react";
import { Consumer } from "../../contexts/MyProvider";
import Input from "../../components/Input/Input";
import HeroInput from "../../components/HeroInput/HeroInput";

import classes from "./AddSection.css";

const AddSection = props => {
  let inputRef = React.createRef();

  return (
    <Consumer>
      {context => (
        <React.Fragment>
          {context.isAddListOpen ? (
            <div className={classes.AddSection}>
              <span
                className={classes.AddSection__close}
                alt="close button"
                onClick={context.toggleAddList}
              />
              <div className={classes.AddSection__container}>
                <HeroInput
                  placeholder="Build A List"
                  label="Build A List"
                  notref={inputRef}
                />
                <Input
                  modifier="gray"
                  type="Button"
                  label="Add List"
                  onClick={() => {
                    console.log(inputRef.current.value);
                    const name = inputRef.current.value;
                    inputRef.current.value = "";
                    context.addList(name);
                    context.toggleAddList();
                  }}
                />
              </div>
            </div>
          ) : null}
        </React.Fragment>
      )}
    </Consumer>
  );
};

export default AddSection;
