import React, { Component } from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom'; 
	{/* ^ creates <a> tags for us */}

class Nav extends Component {
	handleLogout = (e) => {
		console.log('Logging out...');
		e.preventDefault();
		localStorage.removeItem('mernToken'); // will set user's state to Null
		this.props.updateUser();
		// because of ^ line, must pass updateUSer to hte Nav bar as well
	}
	render() {
		let links = '';
		if(this.props.user){
			links = (
				<span>
					<a onClick={this.handleLogout}>Logout</a>
					<Link to="/profile">Profile</Link>
				</span>
				);
		} 
		else {
			links = (
			<span>
					<Link to="/login">Log In</Link>
					<Link to="/signup">Sign Up</Link>
			</span>
			);
		}
		return(
			<div>
				<nav className = "nav" >
					<Link to="/">Home</Link>
					{links}
        		</nav>
				<header className="App-header">
      				<img src={logo} className="App-logo" alt="logo" />
      				<h1 className="App-title">Welcome to React</h1>
    			</header>
			</div>
		);
	}
}

export default Nav;