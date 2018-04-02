import React, { Component } from "react";
import Header from "../Header/Header";
import Authentication from "../Authentication/Authentication";
import MyProvider from "../../contexts/MyProvider";

import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <MyProvider>
          <Authentication />

          <Header />

          <main />
        </MyProvider>
      </React.Fragment>
    );
  }
}

export default App;
