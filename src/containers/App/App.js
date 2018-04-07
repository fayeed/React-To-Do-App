import React, { Component } from "react";
import Header from "../Header/Header";
import Authentication from "../Authentication/Authentication";
import Sidebutton from "../../components/SideButton/Sidebutton";
import Section from "../Section/Section";
import AddSection from "../AddSection/AddSection";
import AddInput from "../AddInput/AddInput";
import MainList from "../MainList/MainList";
import MyProvider from "../../contexts/MyProvider";

import classes from "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <MyProvider>
          <Authentication />

          <Header />

          <main>
            <Sidebutton />
            <div className={classes.App__grid}>
              <MainList />
              <Section />
            </div>
            <AddSection />
            <AddInput />
          </main>
        </MyProvider>
      </React.Fragment>
    );
  }
}

export default App;
