
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
const { check, oneOf, body, validationResult } = require('express-validator');
const moment = require('moment');
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'front-end-app/build')));
let validator_signin = [
	check('email').trim().isEmail().withMessage('Invalid Email Address.'),
	check('password').trim().isLength({ min: 8, max: 30 }).withMessage('Invalid Password. It should be between 8 and 30 characters.'),
];


// api endpoints
app.post('/api/signin', validator_signin, (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		let error_msg = [];
		(errors.errors).forEach(element => {
			error_msg.push(element.msg);

		});
		return res.status(400).json({ message: '[Bad Request]' , errors: error_msg });
	}
	if (req && req.body) {
		if ((req.body.email && req.body.email == 'admin@berteig.com') && req.body.password && req.body.password == "1234567890") {
			res.status(200).json({ message: '[OK] Logged In Successfully' }).end(); return;
		} else {
			res.status(401).json({ message: '[Unauthorized]',errors:['Invalid Login Credentials.'] }).end();; return;
		}
	} else {
		res.status(400).json({ message: '[Bad Request]',errors:['Invalid Request.'] }).end(); return;
	}


});

let validator_checkout = [
	check('email').trim().isEmail().withMessage('Invalid Email Address.'),
	check('card_number').isCreditCard().withMessage('Invalid Card Number.'),
	check('card_expiry_date').trim().isInt({ min: 000000, max: 999999 }).withMessage('Invalid Expiry Date. Length should be 6 digits in MMYYYY format.'),
	check('card_cvv_number').trim().isInt({ min: 000, max: 999 }).withMessage('Invalid CVV Number. Length should be 3 digits.'),
	check('order_total').trim().isInt({ min: 1, max: 99999 }).withMessage('Invalid Order Total. It should be between 1 and 99999 only.')
]
// api endpoints
app.post('/api/checkout', validator_checkout, (req, res) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		let error_msg = [];

		(errors.errors).forEach(element => {

			error_msg.push(element.msg);

		});
		return res.status(400).json({ message: '[Bad Request]', errors: error_msg });
	}
	if (req && req.body) {
		let expiry_date = moment('01-' + req.body.card_expiry_date, 'DD-MMYYYY', true).format('DD-MM-YYYY');
		if (expiry_date !== "Invalid date") {
			let now_date = moment().subtract(1, 'months').format('MM-YYYY');
			if (moment(expiry_date).isAfter('01-' + now_date)) {
				let order_id = Math.floor(Math.random() * 9999) + 1000;
				res.status(200).json({ message: '[OK] Order Confirmed! Your Order ID is : BT-' + order_id }).end(); return;
			} else {
				res.status(400).json({ message: '[Bad Request]', errors: ['Invalid Card. It is Expired.'] }).end(); return;
			}
		} else {
			res.status(400).json({ message: '[Bad Request]', errors: ['Invalid Card Expiry Date.'] }).end(); return;
		}
	} else {
		res.status(400).json({ message: '[Bad Request]', errors: ['Invalid Request.'] }).end(); return;
	}

});


// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/front-end-app/build/index.html'));
});
const port = process.env.PORT || 80;
app.listen(port);
console.log('App is listening on port ' + port);