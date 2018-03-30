import React, { Component } from "react";

import Modal from "../../components/Modal/Modal";
import Backdrop from "../../components/BackDrop/Backdrop";
import InputContainer from "../InputContainer/InputContainer";

// Modal for the Input
class InputModal extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.input ? (
          <React.Fragment>
            <Backdrop click={this.props.click} />
            <Modal>
              <InputContainer addItem={this.props.addItem} />
            </Modal>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}

export default InputModal;
