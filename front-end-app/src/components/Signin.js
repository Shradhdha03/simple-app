
import React, { Component } from 'react';
import './Signin.css';
class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			remember_me: false,
			message: '',
			errors: []
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleInputChange(e) {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({ [name]: value, message: '', errors: [] });
	}
	handleSubmit(e) {
		e.preventDefault();
		this.signinRequest(this.state);
	}
	signinRequest(data) {
		fetch('/api/signin/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: data.email,
				password: data.password
			})
		}).then(res =>
			res.json().then(data => ({ status: res.status, body: data }))
		).then(result => {
			if (result && result.body && result.body.message) {
				this.setState({ message: result.body.message, errors: result.body.errors })
			}
		}).catch((error) => {
			this.setState({ message: JSON.stringify(error) });
		});
	}
	render() {
		let errors = this.state.errors;
		if (errors && errors.length) {
			errors = errors.map((error, index) =>
				<span key={index}><br />{error}</span>);
		} else {
			errors = '';
		}

		return (
			<div className="text-center">
				<main className="form-signin">
					{(this.state.message.includes('[OK]') ? '' : <form onSubmit={this.handleSubmit} >
						<img className="mb-4" src="https://berteig.com/wp-content/uploads/2019/11/BERTEIG-01-Primary.png" alt="Berteig Logo" height="30" />
						<h1 className="h3 mb-3 fw-normal">Please sign in</h1>

						<div className="form-floating">
							<input type="email" name='email' value={this.state.email} className="form-control" id="floatingInput" placeholder="name@example.com" onChange={this.handleInputChange} />
							<label htmlFor="floatingInput">Email address</label>
						</div>
						<div className="form-floating">
							<input type="password" name='password' value={this.state.password} className="form-control" id="floatingPassword" placeholder="Password" onChange={this.handleInputChange} />
							<label htmlFor="floatingPassword">Password</label>
						</div>

						<div className="checkbox mb-3">
							<label>
								<input type="checkbox" value="remember-me" name="remember_me" checked={this.state.remember_me} onChange={this.handleInputChange} /> Remember me
							</label>
						</div>
						<button id="submit-signin" className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
					</form>)}

					<div className="mt-3" id="result-message">
						{(this.state.message ? (this.state.message.includes('[OK]') ? <div class="alert alert-success" role="alert">
							{this.state.message}
						</div> : <div class="alert alert-danger" role="alert">
							{this.state.message}{errors}
						</div>) : '')}
					</div>
				</main>
			</div>

		);
	}
}

export default Signin;
