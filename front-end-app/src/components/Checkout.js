import React, { Component } from 'react';
class Checkout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			address_line_1: '',
			address_line_2: '',
			country: '',
			state: '',
			postal_code: '',
			card_name: '',
			card_number: '',
			card_expiry_date: '',
			card_cvv_number: '',
			save_data: false,
			order_total: 20,
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
		this.checkoutRequest(this.state);
	}
	checkoutRequest(data) {
		fetch('/api/checkout/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				first_name: data.first_name,
				last_name: data.last_name,
				email: data.email,
				address_line_1: data.address_line_1,
				address_line_2: data.address_line_2,
				country: data.country,
				state: data.state,
				postal_code: data.postal_code,
				card_name: data.card_name,
				card_number: data.card_number,
				card_expiry_date: data.card_expiry_date,
				card_cvv_number: data.card_cvv_number,
				save_data: data.save_data,
				order_total: data.order_total
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
			<div className="bg-light text-left checkout-form">
				<div className="container">
					<main>
						<div className="py-5 text-center">
							<img className="d-block mx-auto mb-4" src="https://berteig.com/wp-content/uploads/2019/11/BERTEIG-01-Primary.png" alt="" height="30" />
							<h2>Checkout form</h2>
							<p className="lead">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
						</div>

						{(this.state.message.includes('[OK]') ? '' : <div className="row g-5">
							<div className="col-md-5 col-lg-4 order-md-last">
								<h4 className="d-flex justify-content-between align-items-center mb-3">
									<span className="text-danger">Your cart</span>
									<span className="badge bg-primary rounded-pill">3</span>
								</h4>
								<ul className="list-group mb-3">
									<li className="list-group-item d-flex justify-content-between lh-sm">
										<div>
											<h6 className="my-0">First Product Item</h6>
											<small className="text-muted">Brief description</small>
										</div>
										<span className="text-muted">$12</span>
									</li>
									<li className="list-group-item d-flex justify-content-between lh-sm">
										<div>
											<h6 className="my-0">Second Product Item</h6>
											<small className="text-muted">Brief description</small>
										</div>
										<span className="text-muted">$8</span>
									</li>
									<li className="list-group-item d-flex justify-content-between lh-sm">
										<div>
											<h6 className="my-0">Third Product Item</h6>
											<small className="text-muted">Brief description</small>
										</div>
										<span className="text-muted">$5</span>
									</li>
									<li className="list-group-item d-flex justify-content-between bg-light">
										<div className="text-danger">
											<h6 className="my-0">Promo code</h6>
											<small>EXAMPLECODE</small>
										</div>
										<span className="text-danger">−$5</span>
									</li>
									<li className="list-group-item d-flex justify-content-between">
										<span>Total (USD)</span>
										<strong>$20</strong>
									</li>
								</ul>


							</div>
							<div className="col-md-7 col-lg-8">
								<h4 className="mb-3">Billing address</h4>
								<form className="needs-validation" noValidate="" onSubmit={this.handleSubmit}>
									<div className="row g-3">
										<div className="col-sm-6">
											<label htmlFor="firstName" className="form-label">First name</label>
											<input type="text" name="first_name" className="form-control" id="firstName" placeholder="" value={this.state.first_name} onChange={this.handleInputChange} required="" />
											<div className="invalid-feedback">
												Valid first name is required.
              								</div>
										</div>

										<div className="col-sm-6">
											<label htmlFor="lastName" className="form-label">Last name</label>
											<input type="text" name="last_name" className="form-control" id="lastName" placeholder="" value={this.state.last_name} onChange={this.handleInputChange} required="" />
											<div className="invalid-feedback">
												Valid last name is required.
              								</div>
										</div>



										<div className="col-12">
											<label htmlFor="email" className="form-label">Email</label>
											<input type="email" name="email" className="form-control" id="email" placeholder="you@example.com" value={this.state.email} onChange={this.handleInputChange} required="" />
											<div className="invalid-feedback">
												Please enter a valid email address for shipping updates.
              								</div>
										</div>

										<div className="col-12">
											<label htmlFor="address" className="form-label">Address</label>
											<input type="text" name="address_line_1" className="form-control" id="address" placeholder="1234 Main St" value={this.state.address_line_1} onChange={this.handleInputChange} required="" />
											<div className="invalid-feedback">
												Please enter your shipping address.
              								</div>
										</div>

										<div className="col-12">
											<label htmlFor="address2" className="form-label">Address 2 <span className="text-muted">(Optional)</span></label>
											<input type="text" name="address_line_2" className="form-control" id="address2" placeholder="Apartment or suite" value={this.state.address_line_2} onChange={this.handleInputChange} />
										</div>

										<div className="col-md-5">
											<label htmlFor="country" className="form-label">Country</label>
											<select name="country" className="form-select" id="country" required="" value={this.state.country} onChange={this.handleInputChange}>
												<option value="">Choose...</option>
												<option value="USA">United States</option>
											</select>
											<div className="invalid-feedback">
												Please select a valid country.
              								</div>
										</div>

										<div className="col-md-4">
											<label htmlFor="state" className="form-label">State</label>
											<select name="state" className="form-select" id="state" required="" value={this.state.state} onChange={this.handleInputChange} >
												<option value="">Choose...</option>
												<option value="California">California</option>
												<option value="Florida">Florida</option>
												<option value="New York">New York</option>
											</select>
											<div className="invalid-feedback">
												Please provide a valid state.
              								</div>
										</div>

										<div className="col-md-3">
											<label htmlFor="zip" className="form-label">Zip</label>
											<input name="postal_code" type="text" className="form-control" id="zip" placeholder="" required="" value={this.state.postal_code} onChange={this.handleInputChange} />
											<div className="invalid-feedback">
												Zip code required.
              								</div>
										</div>
									</div>




									<br />
									<hr className="my-4" />

									<h4 className="mb-3 text-left">Payment</h4>



									<div className="row gy-3">
										<div className="col-md-6">
											<label htmlFor="cc-name" className="form-label">Name on card</label>
											<input name="card_name" type="text" className="form-control" id="cc-name" placeholder="" required="" value={this.state.card_name} onChange={this.handleInputChange} />
											<small className="text-muted">Full name as displayed on card</small>
											<div className="invalid-feedback">
												Name on card is required
              								</div>
										</div>

										<div className="col-md-6">
											<label htmlFor="cc-number" className="form-label">Credit card number</label>
											<input name="card_number" type="text" className="form-control" id="cc-number" placeholder="" required="" value={this.state.card_number} onChange={this.handleInputChange} />
											<div className="invalid-feedback">
												Credit card number is required
              								</div>
										</div>

										<div className="col-md-3">
											<label htmlFor="cc-expiration" className="form-label">Expiration</label>
											<input name="card_expiry_date" type="text" className="form-control" id="cc-expiration" placeholder="MMYYYY" required="" value={this.state.card_expiry_date} onChange={this.handleInputChange} />
											<div className="invalid-feedback">
												Expiration date required
              								</div>
										</div>

										<div className="col-md-3">
											<label htmlFor="cc-cvv" className="form-label">CVV</label>
											<input name="card_cvv_number" type="text" className="form-control" id="cc-cvv" placeholder="" required="" value={this.state.card_cvv_number} onChange={this.handleInputChange} />
											<div className="invalid-feedback">
												Security code required
              								</div>
										</div>
									</div>

									<br />
									<div className="form-check">
										<input name="save_data" type="checkbox" className="form-check-input" id="save-info" value={this.state.save_data} onChange={this.handleInputChange} />
										<label className="form-check-label" htmlFor="save-info">Save this information for next time</label>
									</div>
									<br />
									<button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>

									<br />	<br />	<br />	<br />
								</form>


							</div>
						</div>)}



						<div className="mt-3">
							{(this.state.message ? (this.state.message.includes('[OK]') ? <div class="alert alert-success" role="alert">
								{this.state.message}
							</div> : <div class="alert alert-danger" role="alert">
								{this.state.message}{errors}
							</div>) : '')}
						</div>
					</main>


				</div>
			</div>
		);
	}
}

export default Checkout;
