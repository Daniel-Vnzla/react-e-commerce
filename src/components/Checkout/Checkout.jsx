import React, { useState, useEffect } from 'react';
import { commerce } from '../../lib/commerce.js';

import AddressForm from './AddressForm.jsx';
import PaymentForm from './PaymentForm.jsx';

const steps = ["Shipping address", "Payment details"]

const Checkout = ({ cart }) => {
	const [ activeStep, setActiveStep ] = useState(0);
	const [checkoutToken, setCheckoutToken] = useState(null);
	const [shippingData, setShippingData ] = useState({});

	const generateToken = async () => {
		if (!cart.id) return
		try {
			const token = await commerce.checkout.generateToken(cart.id, { type: "cart" });
			setCheckoutToken(token);
		}
		catch(err){
			console.log(err);
		}
	}
	useEffect(() => {
		generateToken();
	},[cart]);

	const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1 );
	const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1 );

  const next = (data) => {
  	setShippingData(data)
  	nextStep();
  }

	const Confimation = () => (
		<div>
			Confimation
		</div>
		)

	const Form = () => activeStep === 0
		? <AddressForm checkoutToken={checkoutToken} next={next} />
		: <PaymentForm checkoutToken={setShippingData} checkoutToken={checkoutToken} backStep={backStep}/>
	
  return (
    <section>
		<div className="checkout">
			<h2>Checkout</h2>
			<ul className="steps">
				<li className={activeStep === 0 ? "active": ""}>1 Ship Address </li>
				<li className={activeStep === 1 ? "active" : ""}>2 Payment</li>
			</ul>
				{activeStep === steps.length ? <Confimation /> : checkoutToken && <Form />}
		</div>
	</section>
  )
}

export default Checkout;