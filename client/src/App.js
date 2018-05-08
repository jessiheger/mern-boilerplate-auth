import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
//Import components:
import Footer from './layout/Footer';
import Home from './Home';
import Login from './auth/login';
import Nav from './layout/nav';
import Profile from './Profile';
import Signup from './auth/signup';

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
            <Route exact path="/login" component={Login} /> 
            <Route exact path="/signup" component={Signup} />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
