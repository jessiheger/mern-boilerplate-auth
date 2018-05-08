import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Home from './Home';
import Nav from './layout/nav';

class App extends Component {
  render() {
    return (
      <div className="App">
      {/* Router wraps a group of routes */}
        <Router> 
          <div className = "container">
            {/* Nav will display on every page, which is why it's not a <Route> */}
            <Nav />
            <Route exact path="/" component={Home} /> 
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
