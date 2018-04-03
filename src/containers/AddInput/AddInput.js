import React from "react";
import { Consumer } from "../../contexts/MyProvider";
import HeroInput from "../../components/HeroInput/HeroInput";
import Input from "../../components/Input/Input";

import classes from "./AddInput.css";

const AddInput = () => {
  let inputRef = React.createRef();
//   let selectRef = React.createRef();
  let select = null

  let changeSelect = (e) => {
      select = e
  }

  return (
    <Consumer>
      {context => (
        <React.Fragment>
          {context.isInputOpen ? (
            <div className={classes.AddInput}>
              <span
                className={classes.AddInput__close}
                alt="close button"
                onClick={context.toggleInput}
              />
              <div className={classes.AddInput__container}>
                <HeroInput
                  placeholder="What do you need to do?"
                  label="What do you need to do?"
                  notref={inputRef}
                />

                <Input
                  className={classes.AddInput__select}
                  type="Select"
                  list={context.list}
                  notref={changeSelect}
                />

                <Input
                  modifier="gray"
                  type="Button"
                  label="Add Item"
                  onClick={() => {
                    console.log(inputRef.current.value, select.value);
                    const name = inputRef.current.value;
                    inputRef.current.value = "";
                    context.add(name);
                    context.toggleInput();
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

export default AddInput;
