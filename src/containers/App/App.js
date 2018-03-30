import React, { Component } from 'react';
import MainList from '../MainList/MainList';
import InputContainer from '../InputContainer/InputContainer';
import SideDrawer from '../SideDrawer/SideDrawer';
import config from '../../firebase/firebaseconfig';
import * as firebase from 'firebase';

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

  database = config.database();

  changeEmail = (email) => {
    this.setState({email})
  }

  pushList = (ele, type) => {
    //e.preventDefault()
    //email = email.replace(/\./i, 'j')
    let todos = []

    console.log(todos)

    this.database.ref(`/users/${this.state.email}`).once('value').then((todo) => {
      if(type === 'items') {
        todos = todo.val().items || []
        console.log(todos)
      } else if(type === 'completed'){
        todos = todo.val().completed || []
        console.log(todos)
      } else if(type === 'canceled') {
        todos = todo.val().canceled || []
        console.log(todos)
      }

      const d = new Date();

      todos.push({id:ele.id, message:ele.message, category: ele.category,
         time: `${d.getDate()}/${d.getMonth()}/${d.getFullYear}`, urgency: ele.urgency})

      this.database.ref(`users/${this.state.email}/${type}`).set(todos)
      console.log('complete')
    })
  }

  removeList = (id, type) => {
    this.database.ref(`/users/${this.state.email}/${type}`).orderByChild('id').equalTo(id)
      .once('value').then(snapshot => {
        snapshot.forEach(childSnapshot => {
        //remove each child
        this.database.ref(`/users/${this.state.email}/${type}`).child(childSnapshot.key).remove();
      });
    });
  }

  readList = (type) => {
    this.database.ref(`/users/${this.state.email}/${type}`).once('value').then((todo) => {
      if(type === 'items') {
        this.setState({items: todo.val() || []})
      } else if(type === 'completed'){
        this.setState({completed: todo.val() || []})
      } else if(type === 'canceled') {
        this.setState({canceled: todo.val() || []})
      }
      //this.setState({items: todo.val() || []})
      console.log('read : ', todo.val() || [])
    })
  }

  removeItem = (id) => {
    // remove the item in he list
    // update the content
      let i = [...this.state.items].filter(ele => ele.id !== id)
      let s = [...this.state.canceled]
      let filtered = [...this.state.items].filter(ele => ele.id === id)[0]
      console.log(filtered)
      s.push(filtered)

    if(this.state.isLoggedIn){
      this.pushList(filtered, 'canceled')
      this.removeList(id, 'items')
      this.setState({canceled: s, items: i})
    } else {
      this.setState({canceled: s, items: i})
    }
  }

  completeItem = (id) => {

    let i = [...this.state.items].filter(ele => ele.id !== id)
      let s = [...this.state.completed]
      let filtered = [...this.state.items].filter(ele => ele.id === id)[0]
      console.log(filtered)
      s.push(filtered)

    if(this.state.isLoggedIn){
      this.pushList(filtered, 'completed')
      this.removeList(id, 'items')
      this.setState({completed: s, items: i})
    } else {
      this.setState({completed: s, items: i})
    }
  }

  addItem = (e, ele) => {
    // add item in the list
    // update the content
      e.preventDefault()
      let s = [...this.state.items]
      s.push(ele)
      this.setState({items: s})

    if(this.state.isLoggedIn){
      this.pushList(ele, 'items')
    }
  }

  changeList = (i) => {
    this.setState({current: i});
  }

  toggleLogged = () => {
    this.setState({isLoggedIn:!this.state.isLoggedIn})
  }

  componentDidMount () {
    console.log('component Did mount')
    this.readList('items');
    this.readList('completed');
    this.readList('canceled');
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
          logged={this.state.isLoggedIn}
          toggleLogged={this.toggleLogged}
          changeEmail={this.changeEmail}
          startUpdate={this.readList}/>
      </main>
    );
  }
}

export default App;
