import React, { Component } from "react";
import InputElement from "../../components/InputElement/InputElement";
import config from "../../firebase/firebaseconfig";

import classes from "./InputContainer.css";

// holds all the input elements
class InputContainer extends Component {
  state = {
    message: "", // entered item of the message
    category: "", // what type of item is it ex. sopping list, work, etc.
    urgency: "1" // urgenecy level ranges from : [1, 2, 3]
  };

  // checks for the change in input element
  // based on the id provided to it
  inputChanged = (e, id) => {
    e.preventDefault();
    let s = { ...this.state };

    if (id === "1") {
      s.message = e.target.value;
      this.setState({ ...s });
    } else if (id === "2") {
      s.category = e.target.value;
      this.setState({ ...s });
    } else if (id === "3") {
      s.urgency = e.target.value;
      this.setState({ ...s });
    }
  };

  // reset the state
  reset = () => {
    this.setState({
      message: "",
      category: "",
      urgency: "1"
    });
  };

  database = config.database(); // ref to the database

  render() {
    const key = this.database.ref(`/users/test@testjcom`).push().key; // get a unique key for the item

    return (
      <div className={classes.InputContainer}>
        <form
          onSubmit={e =>
            this.props.addItem(e, {
              message: this.state.message,
              category: this.state.category,
              urgency: this.state.urgency,
              id: key,
              time: "09/2/18"
            })
          }
        >
          <h2>Add The Item</h2>

          <InputElement
            id="1"
            type="input"
            // style={{width:'300px'}}
            name="item"
            content="To-Do item"
            placeholder="Enter the item here..."
            value={this.state.message}
            changed={e => this.inputChanged(e, "1")}
          />

          <InputElement
            id="2"
            type="input"
            name="category"
            content="Category"
            value={this.state.category}
            placeholder="Enter the Category here..."
            changed={e => this.inputChanged(e, "2")}
          />

          <InputElement
            id="3"
            type="select"
            value={this.state.urgency}
            changed={e => this.inputChanged(e, "3")}
            list={[
              { option: "low", value: 1 },
              { option: "medium", value: 2 },
              { option: "high", value: 3 }
            ]}
          />

          <InputElement type="button" label="ADD" />
        </form>
      </div>
    );
  }
}

export default InputContainer;
