import React, { useState, useEffect } from 'react';
import { commerce } from '../../lib/commerce.js';

import AddressForm from './AddressForm.jsx';
import PaymentForm from './PaymentForm.jsx';

const steps = ["Shipping address", "Payment details"]

const Checkout = ({ cart }) => {
	const [ activeStep, setActiveStep ] = useState(0);
	const [checkoutToken, setCheckoutToken] = useState(null);

	const generateToken = async () => {
		try {
			const token = await commerce.checkout.generateToken(cart.id, { type: "cart" });
			setCheckoutToken(token);
		}
		catch(err){
			console.error(err);
		}
	}
	useEffect(() => {
		generateToken();
	},[cart]);

	const Confimation = () => (
		<div>
			Confimation
		</div>
		)

	const Form = () => activeStep === 0
		? <AddressForm checkoutToken={checkoutToken} />
		: <PaymentForm />
	
  return (
    <section>
		<div className="checkout">
			<h2>Checkout</h2>
			<ul className="steps">
				<li className="active">1 Ship Address </li>
				<li>2 Payment</li>
			</ul>
				{activeStep === steps.length ? <Confimation /> : checkoutToken && <Form />}
		</div>
	</section>
  )
}

export default Checkout;