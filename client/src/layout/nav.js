import React, { Component } from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom'; 
	{/* ^ creates <a> tags for us */}

class Nav extends Component {
	render() {
		return(
			<div>
				<nav className = "nav">
					<Link to="/">Home</Link>
					<header className="App-header">
          				<img src={logo} className="App-logo" alt="logo" />
          				<h1 className="App-title">Welcome to React</h1>
        			</header>
        		</nav>
			</div>
		);
	}
}

export default Nav;