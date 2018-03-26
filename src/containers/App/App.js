import React, { Component } from 'react';
import MainList from '../MainList/MainList';
import InputContainer from '../InputContainer/InputContainer';
import SideDrawer from '../SideDrawer/SideDrawer';

import './App.css';

class App extends Component {

  state = {
    items: [
      {id:1, message: 'Cut your hair', category: 'Lifestyle', time: '27/3/18', urgency: '1'},
      {id:2, message: 'Complete the project', category: 'Job', time: '28/5/18', urgency: '2'},
      {id:3, message: 'Buy Apples', category: 'Shopping List', time: '24/1/18', urgency: '3'}
    ]
  }

  removeItem = () => {
    // remove the item in he list
    // update the content
  }

  addItem = () => {
    // add item in the list
    // update the content
  }

  render() {

    return (
      <main>
        <MainList items={this.state.items}/>
        <InputContainer />
        <SideDrawer />
      </main>
    );
  }
}

export default App;
