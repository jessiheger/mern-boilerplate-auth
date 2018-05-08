// in app, put it in "LoggedInOnly"/compoenents folder

import React, { Component } from 'react';

class Profile extends Component {
	render() {
		if(this.props.user){
			return(
				<div>
					<h2>Hello again, {this.props.user.name}!</h2>
					<h4>Your email is {this.props.user.email}.</h4>
				</div>
			);
		}
		return(
			<div>
				<p>PROFILE PAGE! You must be logged in to view this page.</p>
				<p>Would you like to <a href="/login">log in</a> or <a href="/signup">sign up</a>?</p>
			</div>
		);
	}
}

export default Profile;