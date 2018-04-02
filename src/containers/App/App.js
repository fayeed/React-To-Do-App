import React, { Component } from "react";
import Header from "../Header/Header";
import Authentication from "../Authentication/Authentication";
import Sidebutton from '../../components/SideButton/Sidebutton';
import Section from '../Section/Section';
import MyProvider from "../../contexts/MyProvider";

import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <MyProvider>
          <Authentication />

          <Header />

          <main >
            <Sidebutton />
            <Section />
            </main>
        </MyProvider>
      </React.Fragment>
    );
  }
}

export default App;
