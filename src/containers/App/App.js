import React, { Component } from 'react';
import MainList from '../MainList/MainList';
import InputContainer from '../InputContainer/InputContainer';
import SideDrawer from '../SideDrawer/SideDrawer';

import './App.css';

class App extends Component {

  render() {

    return (
      <main>
        <MainList />
        <InputContainer />
        <SideDrawer />
      </main>
    );
  }
}

export default App;
