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
    ],
    completed: [],
    canceled: [],
    isLoggedIn: false,
    email: ''
  }

  removeItem = (id) => {
    // remove the item in he list
    // update the content
    if(!this.isLoggedIn){
      let i = [...this.state.items].filter(ele => ele.id !== id)
      let s = [...this.state.canceled]
      s.push([...this.state.items].filter(ele => ele.id === id)[0])
      this.setState({canceled: s, items: i})
    } else {
      // someshit
    }
  }

  completeItem = (id) => {
    if(!this.isLoggedIn){
      let i = [...this.state.items].filter(ele => ele.id !== id)
      let s = [...this.state.completed]
      s.push([...this.state.items].filter(ele => ele.id === id)[0])
      this.setState({completed: s, items: i})
    } else {
      // someshit
    }
  }

  addItem = (e, ele) => {
    // add item in the list
    // update the content
    if(!this.isLoggedIn){
      e.preventDefault()
      let s = [...this.state.items]
      s.push(ele)
      this.setState({items: s})
    } else {
      // firebase rules here
    }
    
  }

  render() {

    return (
      <main>
        <MainList 
          items={this.state.items} 
          complete={this.completeItem}
          canceled={this.removeItem}/>
        <InputContainer addItem={this.addItem}/>
        <SideDrawer />
      </main>
    );
  }
}

export default App;
