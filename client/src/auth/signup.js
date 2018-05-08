import React, { Component } from 'react';

class Signup extends Component {
	constructor(props){
		super(props);
	{/* give Signup an initial state */}
		this.state = {
			name: '',
			email: '',
			password: ''
		};
	}

	handleNameChange =(e) => {
		this.setState({ name: e.target.value });
	}

	handleEmailChange =(e) => {
		this.setState({ email: e.target.value });
	}
	handlePasswordChange =(e) => {
		this.setState({ password: e.target.value });
	}

	handleSubmit = (e) => {
	{/* bc we use an arrow function, the scope is still to the Sign up component*/}
		e.preventDefault();
		console.log('form was submitted', this.state);
	}


	render() {
		return(
			<div>
				<h2>Signup As a New User!</h2>
				<form onSubmit={this.handleSubmit}>
				{/* handeSubmit is defined above; "this" is referring to the Signup component*/}
					<div>
						<input name="Name" placeholder="What is your name?" value={this.state.name} onChange={this.handleNameChange}>
						</input>
					</div>
					<div>
						<input name="Email" placeholder="What is your email?" value={this.state.email} onChange={this.handleEmailChange}>
						</input>
					</div>
					<div>
						<input name="Password" placeholder="What is your password?" value={this.state.password1} onChange={this.handlePasswordChange}>
						</input>
					</div>
					<input type="submit" value="Sign Me Up!" className="button" />
				</form>
			</div>
		);
	}
}

export default Signup;