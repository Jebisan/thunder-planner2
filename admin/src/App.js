import React, { Component } from 'react';
import './App.css';
import List from './components/List/List';
//import NewPost from './components/NewPost/NewPost';

class App extends Component {


  render() {
    return (
     <div className="App">
     <List/>
      </div>
    );
  }
}

export default App;
