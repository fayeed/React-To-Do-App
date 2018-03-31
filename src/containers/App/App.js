import React, { Component } from "react";
import Header from '../Header/Header';
import SignUp from '../SignUp/SignUp';
import MyProvider from '../../contexts/MyProvider';

import "./App.css";

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <MyProvider>

          <SignUp />

          <Header />

          <main>

          </main>
          
        </MyProvider>
      </React.Fragment>
    )
  }
}

export default App;
