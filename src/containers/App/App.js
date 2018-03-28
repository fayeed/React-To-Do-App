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
    email: '',
    current:1
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

  changeList = (i) => {
    console.log('cliked')
    this.setState({current: i});
  }

  render() {

    let items = this.state.items;

    if(this.state.current === 1) {
      items = this.state.items
    } else if(this.state.current === 2){
      items = this.state.completed
    } else if(this.state.current === 3) {
      items = this.state.canceled
    }

    return (
      <main>
        <MainList 
          items={items} 
          complete={this.completeItem}
          canceled={this.removeItem}/>
        <InputContainer addItem={this.addItem}/>
        <SideDrawer 
          changeTo={this.changeList}
          logged={this.state.isLoggedIn}/>
      </main>
    );
  }
}

export default App;
