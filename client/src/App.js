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
  constructor(props) {
    super(props);
    this.state= {
      user: null
    }
  }

  // tells us that the loading has happened of the App component; simiilar to document.ready
  componentDidMount = () => {
    console.log('component did mount')
    this.getUser();
  }

  getUser = () => {
    console.log('get user');
    let token = localStorage.getItem('mernToken');
    if(token){
      console.log('token found in LS', token)
      // if there is a token in local storage, try to validate it
      axios.post('/auth/me/from/token', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        console.log('SUCCESS!', response);
        // if successful, assign the user the to the state
        this.setState({
          user: response.data.user
        });
      })
      .catch(err => {
        console.log('ERROR', err);
        console.log('response', err.response);
        // if problem, token is cleared and user gets assigned back to "null"
        localStorage.removeItem('mernToken');
        this.setState({
          user: null
        });
      });
    }
    else {
      console.log('No token was found')
      localStorage.removeItem('mernToken');
        this.setState({
          user: null
        })
    }
}


  render() {
    return (
      <div className="App">
      {/* Router wraps a group of routes */}
        <Router> 
          <div className = "container">
            {/* Nav will display on every page, which is why it's not a <Route> */}
            <Nav user={this.state.user} updateUser={this.getUser}/>
            {/* Nav bar knows if there's a user or not*/}
            <Route exact path="/" component={Home} /> 
            <Route path="/login" component={
              () => (<Login user={this.state.user} updateUser={this.getUser} />) 
            } /> 
            {/*  ^ allows the other pages to know if there's a logged in user or not*/}
            <Route path="/signup" component={
              () => (<Signup user={this.state.user} updateUser={this.getUser} />)} />
              {/*  ^ allows the other pages to know if there's a signed up user or not*/}
            <Route path="/profile" component={
              () => (<Profile user={this.state.user} />)} />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
