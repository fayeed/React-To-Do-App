import React, { Component } from "react";
import SignUp from "../../components/SignUp/SignUp";
import Backdrop from "../../components/BackDrop/Backdrop";

import classes from "./SideDrawer.css";

// Sidedrawer component
class SideDrawer extends Component {
  state = {
    drawer: false // is drower open
  };

  toggleDrawer = () => {
    this.setState({
      drawer: !this.state.drawer
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.drawer ? <Backdrop click={this.toggleDrawer} /> : null}
        <div
          className={
            !this.state.drawer ? classes.SideDrawer : classes.SideDrawerActive
          }
          onClick={!this.state.drawer ? this.toggleDrawer : null}
        >
          <SignUp
            changeTo={this.props.changeTo}
            logged={this.props.logged}
            toggleLogged={this.props.toggleLogged}
            changeEmail={this.props.changeEmail}
            startUpdate={this.props.startUpdate}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default SideDrawer;